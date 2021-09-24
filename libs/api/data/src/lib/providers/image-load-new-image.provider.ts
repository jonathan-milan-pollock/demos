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
  uploadStreamToBlob$,
} from '@dark-rush-photography/api/util';
import { ImageDimensionProvider } from './image-dimension.provider';
import { ImageResizeProvider } from './image-resize.provider';
import { ConfigProvider } from './config.provider';
import { DocumentModel } from '../..';

@Injectable()
export class ImageLoadNewImageProvider {
  private readonly logger: Logger;

  constructor(
    private readonly configProvider: ConfigProvider,
    private readonly imageDimensionProvider: ImageDimensionProvider,
    private readonly imageResizeProvider: ImageResizeProvider
  ) {
    this.logger = new Logger(ImageLoadNewImageProvider.name);
  }

  loadNewImage$(
    googleDrive: drive_v3.Drive,
    imageFileId: string,
    media: Media,
    documentModel: DocumentModel
  ): Observable<void> {
    const smallResolution = findImageResolution(ImageDimensionType.Small);

    return from(downloadGoogleDriveImageFile(googleDrive, imageFileId)).pipe(
      concatMap((filePath) =>
        uploadStreamToBlob$(
          this.configProvider.getAzureStorageConnectionString(media.state),
          this.configProvider.getAzureStorageBlobContainerName(media.state),
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
          smallResolution.type,
          resolution,
          documentModel
        );
      }),
      map(() => undefined)
    );
  }
}
