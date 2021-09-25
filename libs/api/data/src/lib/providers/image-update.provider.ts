import * as fs from 'fs-extra';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { concatMap, from, map, Observable, of } from 'rxjs';
import { Model } from 'mongoose';

import {
  Image,
  ImageDimension,
  Media,
} from '@dark-rush-photography/shared/types';
import { ImageUpdateDto } from '@dark-rush-photography/api/types';
import {
  deleteBlob$,
  downloadBlobToFile$,
  getAzureStorageBlobPath,
  uploadStreamToBlob$,
} from '@dark-rush-photography/api/util';
import { Document, DocumentModel } from '../schema/document.schema';
import { validateEntityFound } from '../entities/entity-validation.functions';
import { loadMedia } from '../content/media.functions';
import { ImageDimensionProvider } from './image-dimension.provider';
import { ImageProvider } from './image.provider';
import { ConfigProvider } from './config.provider';

@Injectable()
export class ImageUpdateProvider {
  private readonly logger: Logger;

  constructor(
    private readonly configProvider: ConfigProvider,
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly imageProvider: ImageProvider,
    private readonly imageDimensionProvider: ImageDimensionProvider
  ) {
    this.logger = new Logger(ImageUpdateProvider.name);
  }

  update$(
    image: Image,
    imageUpdate: ImageUpdateDto
  ): Observable<DocumentModel> {
    if (image.fileName === imageUpdate.fileName) {
      return this.imageProvider.update$(image.id, image.entityId, imageUpdate);
    }

    const media = loadMedia(
      image.id,
      image.entityId,
      image.state,
      image.blobPathId,
      image.fileName
    );
    const mediaUpdate = loadMedia(
      image.id,
      image.entityId,
      image.state,
      image.blobPathId,
      imageUpdate.fileName
    );

    return from(this.entityModel.findById(image.entityId)).pipe(
      map(validateEntityFound),
      concatMap((documentModel) =>
        this.updateBlobPath$(media, mediaUpdate, documentModel.imageDimensions)
      ),
      concatMap(() =>
        this.imageProvider.update$(image.id, image.entityId, imageUpdate)
      )
    );
  }

  updateBlobPath$(
    media: Media,
    mediaUpdate: Media,
    imageDimensions: ImageDimension[]
  ): Observable<void> {
    return downloadBlobToFile$(
      this.configProvider.azureStorageConnectionStringPublic,
      this.configProvider.azureStorageBlobContainerNamePublic,
      getAzureStorageBlobPath(media.blobPathId, media.fileName),
      media.fileName
    ).pipe(
      concatMap((filePath) =>
        uploadStreamToBlob$(
          this.configProvider.azureStorageConnectionStringPublic,
          this.configProvider.azureStorageBlobContainerNamePublic,
          fs.createReadStream(filePath),
          getAzureStorageBlobPath(media.blobPathId, mediaUpdate.fileName)
        )
      ),
      concatMap(() =>
        deleteBlob$(
          this.configProvider.azureStorageConnectionStringPublic,
          this.configProvider.azureStorageBlobContainerNamePublic,
          getAzureStorageBlobPath(media.blobPathId, media.fileName)
        )
      ),
      concatMap(() => {
        if (imageDimensions.length === 0) return of(undefined);

        return from(imageDimensions).pipe(
          concatMap((imageDimension) =>
            this.imageDimensionProvider.updateBlobPath$(
              media,
              mediaUpdate,
              imageDimension
            )
          )
        );
      })
    );
  }
}
