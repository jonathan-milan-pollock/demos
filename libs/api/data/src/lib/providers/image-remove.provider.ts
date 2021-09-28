import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { concatMap, filter, from, last, map, Observable, of } from 'rxjs';
import { Model } from 'mongoose';

import {
  Image,
  ImageDimension,
  ImageState,
} from '@dark-rush-photography/shared/types';
import {
  deleteBlob$,
  getAzureStorageBlobPath,
  getAzureStorageBlobPathWithDimension,
} from '@dark-rush-photography/api/util';
import { Document, DocumentModel } from '../schema/document.schema';
import { validateEntityFound } from '../entities/entity-validation.functions';
import { ConfigProvider } from './config.provider';

@Injectable()
export class ImageRemoveProvider {
  private readonly logger: Logger;

  constructor(
    private readonly configProvider: ConfigProvider,
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>
  ) {
    this.logger = new Logger(ImageRemoveProvider.name);
  }

  removeImages$(state: ImageState, entityId: string): Observable<void> {
    return from(this.entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      concatMap((documentModel) => {
        const imagesForState = documentModel.images.filter(
          (image) => image.state === state
        );
        if (imagesForState.length === 0) return of(undefined);

        return from(imagesForState).pipe(
          filter((image) => image.state === state),
          concatMap((image) => this.removeImage$(image, entityId))
        );
      }),
      last(),
      map(() => undefined)
    );
  }

  removeImage$(image: Image, entityId: string): Observable<DocumentModel> {
    return from(this.entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      concatMap((documentModel) =>
        this.removeImageBlobs$(
          image.state,
          image.blobPathId,
          image.fileName,
          documentModel.imageDimensions.filter(
            (imageDimension) => imageDimension.id === image.id
          )
        ).pipe(
          concatMap(() => {
            this.logger.log(`Removing image ${image.fileName}`);
            return from(
              this.entityModel.findByIdAndUpdate(entityId, {
                images: [
                  ...documentModel.images.filter(
                    (image) => image.id !== image.id
                  ),
                ],
                imageDimensions: [
                  ...documentModel.imageDimensions.filter(
                    (imageDimension) => imageDimension.imageId !== image.id
                  ),
                ],
                comments: [
                  ...documentModel.comments.filter(
                    (comment) => comment.imageId !== image.id
                  ),
                ],
                emotions: [
                  ...documentModel.emotions.filter(
                    (emotion) => emotion.imageId !== image.id
                  ),
                ],
              })
            );
          }),
          map(validateEntityFound)
        )
      )
    );
  }

  removeImageBlobs$(
    state: ImageState,
    blobPathId: string,
    fileName: string,
    imageDimensions: ImageDimension[]
  ): Observable<boolean> {
    if (imageDimensions.length === 0) {
      return deleteBlob$(
        this.configProvider.azureStorageConnectionStringPublic,
        this.configProvider.azureStorageBlobContainerNamePublic,
        getAzureStorageBlobPath(blobPathId, fileName)
      );
    }

    return from(imageDimensions).pipe(
      concatMap((imageDimension) =>
        deleteBlob$(
          this.configProvider.azureStorageConnectionStringPublic,
          this.configProvider.azureStorageBlobContainerNamePublic,
          getAzureStorageBlobPathWithDimension(
            blobPathId,
            fileName,
            imageDimension.type
          )
        )
      ),
      last(),
      concatMap(() =>
        deleteBlob$(
          this.configProvider.azureStorageConnectionStringPublic,
          this.configProvider.azureStorageBlobContainerNamePublic,
          getAzureStorageBlobPath(blobPathId, fileName)
        )
      )
    );
  }
}
