import * as fs from 'fs-extra';
import { Injectable, Logger } from '@nestjs/common';

import { concatMap, concatMapTo, from, Observable, tap } from 'rxjs';

import {
  Image,
  ImageDimension,
  Media,
} from '@dark-rush-photography/shared/types';
import { ImageUpdateDto } from '@dark-rush-photography/api/types';
import { DocumentModel } from '../schema/document.schema';
import {
  deleteBlob$,
  downloadBlobToFile$,
  getAzureStorageBlobPath,
  uploadStreamToBlob$,
} from '@dark-rush-photography/api/util';
import { loadMedia } from '../content/media.functions';
import { ConfigProvider } from './config.provider';
import { ImageDimensionProvider } from './image-dimension.provider';
import { ImageProvider } from './image.provider';

@Injectable()
export class ImageUpdateProvider {
  private readonly logger: Logger;
  constructor(
    private readonly configProvider: ConfigProvider,
    private readonly imageProvider: ImageProvider,
    private readonly imageDimensionProvider: ImageDimensionProvider
  ) {
    this.logger = new Logger(ImageUpdateProvider.name);
  }

  update$(
    image: Image,
    imageUpdate: ImageUpdateDto,
    documentModel: DocumentModel
  ): Observable<DocumentModel> {
    const media = loadMedia(
      image.id,
      documentModel._id,
      image.state,
      image.blobPathId,
      image.fileName
    );
    const mediaUpdate = loadMedia(
      image.id,
      documentModel._id,
      image.state,
      image.blobPathId,
      image.fileName
    );

    // TODO: if a state change need to add a new image
    // TODO: validate can only move from new to published, published to archived and archived to published

    if (media.fileName === mediaUpdate.fileName) {
      return this.imageProvider.update$(image.id, image.entityId, imageUpdate);
    }

    return this.updateBlobPath$(
      media,
      mediaUpdate,
      documentModel.imageDimensions
    ).pipe(
      concatMapTo(
        this.imageProvider.update$(image.id, image.entityId, imageUpdate)
      )
    );
  }

  updateBlobPath$(
    media: Media,
    mediaUpdate: Media,
    imageDimensions: ImageDimension[]
  ): Observable<boolean> {
    return from(imageDimensions)
      .pipe(
        concatMap((imageDimension) =>
          this.imageDimensionProvider.updateBlobPath$(
            media,
            mediaUpdate,
            imageDimension
          )
        )
      )
      .pipe(
        tap(() => this.logger.debug('Download image')),
        concatMapTo(
          downloadBlobToFile$(
            this.configProvider.getAzureStorageConnectionString(media.state),
            this.configProvider.getAzureStorageBlobContainerName(media.state),
            getAzureStorageBlobPath(media.blobPathId, media.fileName),
            media.fileName
          )
        ),
        tap(() => this.logger.debug('Upload image to new blob path')),
        concatMap((filePath) =>
          uploadStreamToBlob$(
            this.configProvider.getAzureStorageConnectionString(media.state),
            this.configProvider.getAzureStorageBlobContainerName(media.state),
            fs.createReadStream(filePath),
            getAzureStorageBlobPath(media.blobPathId, mediaUpdate.fileName)
          )
        ),
        tap(() => this.logger.debug('Remove image at previous blob path')),
        concatMap(() =>
          deleteBlob$(
            this.configProvider.getAzureStorageConnectionString(media.state),
            this.configProvider.getAzureStorageBlobContainerName(media.state),
            getAzureStorageBlobPath(media.blobPathId, media.fileName)
          )
        )
      );
  }
}
