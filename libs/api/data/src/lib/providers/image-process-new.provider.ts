import * as fs from 'fs-extra';
import { Injectable, Logger } from '@nestjs/common';

import { v4 as uuidv4 } from 'uuid';
import { concatMap, from, map, Observable } from 'rxjs';
import { drive_v3 } from 'googleapis';

import { ImageDimensionType, Media } from '@dark-rush-photography/shared/types';
import {
  downloadGoogleDriveImageFile,
  findImageResolution,
  findImageResolution$,
  getAzureStorageBlobPath,
  uploadBufferToBlob$,
  uploadStreamToBlob$,
} from '@dark-rush-photography/api/util';
import { ImageDimensionProvider } from './image-dimension.provider';
import { ImageResizeProvider } from './image-resize.provider';
import { ConfigProvider } from './config.provider';

@Injectable()
export class ImageProcessNewProvider {
  private readonly logger: Logger;

  constructor(
    private readonly configProvider: ConfigProvider,
    private readonly imageDimensionProvider: ImageDimensionProvider,
    private readonly imageResizeProvider: ImageResizeProvider
  ) {
    this.logger = new Logger(ImageProcessNewProvider.name);
  }

  loadNewImage$(
    googleDrive: drive_v3.Drive,
    imageFileId: string,
    media: Media
  ): Observable<void> {
    const smallResolution = findImageResolution(ImageDimensionType.Small);

    return from(downloadGoogleDriveImageFile(googleDrive, imageFileId)).pipe(
      concatMap((filePath) =>
        uploadStreamToBlob$(
          this.configProvider.azureStorageConnectionStringPublic,
          this.configProvider.azureStorageBlobContainerNamePublic,
          fs.createReadStream(filePath),
          getAzureStorageBlobPath(media.blobPathId, media.fileName)
        )
      ),
      concatMap(() => this.imageResizeProvider.resize$(media, smallResolution)),
      concatMap((filePath) => findImageResolution$(filePath)),
      concatMap((resolution) => {
        const imageDimensionId = uuidv4();
        return this.imageDimensionProvider.add$(
          imageDimensionId,
          media.id,
          media.entityId,
          smallResolution.type,
          resolution
        );
      }),
      map(() => undefined)
    );
  }

  upload$(media: Media, file: Express.Multer.File): Observable<void> {
    const smallResolution = findImageResolution(ImageDimensionType.Small);

    return uploadBufferToBlob$(
      this.configProvider.azureStorageConnectionStringPublic,
      this.configProvider.azureStorageBlobContainerNamePublic,
      file.buffer,
      getAzureStorageBlobPath(media.blobPathId, media.fileName)
    ).pipe(
      concatMap(() => this.imageResizeProvider.resize$(media, smallResolution)),
      concatMap((filePath) => findImageResolution$(filePath)),
      concatMap((resolution) => {
        const imageDimensionId = uuidv4();
        return this.imageDimensionProvider.add$(
          imageDimensionId,
          media.id,
          media.entityId,
          smallResolution.type,
          resolution
        );
      }),
      map(() => undefined)
    );
  }
}
