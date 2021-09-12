import * as fs from 'fs-extra';
import { Injectable, Logger } from '@nestjs/common';

import { v4 as uuidv4 } from 'uuid';
import { concatMap, from, map, Observable } from 'rxjs';
import { drive_v3 } from 'googleapis';

import { ImageDimensionType } from '@dark-rush-photography/shared/types';
import { Media } from '@dark-rush-photography/shared/types';
import {
  getAzureStorageBlobPath,
  uploadStreamToBlob$,
  downloadGoogleDriveFile,
  findImageResolution,
  findImageResolution$,
} from '@dark-rush-photography/api/util';
import { ConfigProvider } from './config.provider';
import { ImageDimensionProvider } from './image-dimension.provider';
import { TinifyImageProvider } from './tinify-image.provider';
import { ResizeImageProvider } from './resize-image.provider';

@Injectable()
export class ImageProcessProvider {
  private readonly logger: Logger;

  constructor(
    private readonly configProvider: ConfigProvider,
    private readonly imageDimensionProvider: ImageDimensionProvider,
    private readonly tinifyImageProvider: TinifyImageProvider,
    private readonly resizeImageProvider: ResizeImageProvider
  ) {
    this.logger = new Logger(ImageProcessProvider.name);
  }

  processNewImage(
    googleDrive: drive_v3.Drive,
    imageFileId: string,
    media: Media
  ): Observable<void> {
    const smallResolution = findImageResolution(ImageDimensionType.Small);
    const id = uuidv4();
    return from(downloadGoogleDriveFile(googleDrive, imageFileId)).pipe(
      concatMap((filePath) =>
        uploadStreamToBlob$(
          this.configProvider.getAzureStorageConnectionString(media.state),
          this.configProvider.getAzureStorageBlobContainerName(media.state),
          fs.createReadStream(filePath),
          getAzureStorageBlobPath(media.blobPathId, media.fileName)
        )
      ),
      concatMap(() => this.resizeImageProvider.resize$(media, smallResolution)),
      concatMap(([filePath]) => findImageResolution$(filePath)),
      concatMap((resolution) =>
        this.imageDimensionProvider.add$(
          id,
          media.id,
          media.entityId,
          smallResolution.type,
          resolution
        )
      ),
      map(() => undefined)
    );
  }

  processImage(
    googleDrive: drive_v3.Drive,
    imageFileId: string,
    media: Media
  ): Observable<void> {
    const smallResolution = findImageResolution(ImageDimensionType.Small);
    const id = uuidv4();
    return from(downloadGoogleDriveFile(googleDrive, imageFileId)).pipe(
      concatMap((filePath) =>
        uploadStreamToBlob$(
          this.configProvider.getAzureStorageConnectionString(media.state),
          this.configProvider.getAzureStorageBlobContainerName(media.state),
          fs.createReadStream(filePath),
          getAzureStorageBlobPath(media.blobPathId, media.fileName)
        )
      ),
      concatMap(() => this.tinifyImageProvider.tinifyImage$(media)),
      concatMap(() => this.resizeImageProvider.resize$(media, smallResolution)),
      concatMap(([filePath]) => findImageResolution$(filePath)),
      concatMap((resolution) =>
        this.imageDimensionProvider.add$(
          id,
          media.id,
          media.entityId,
          smallResolution.type,
          resolution
        )
      ),
      map(() => undefined)
    );
  }
}
