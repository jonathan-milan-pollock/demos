import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { concatMap, filter, from, last, map, Observable, of } from 'rxjs';
import { Model } from 'mongoose';

import {
  Image,
  ImageDimension,
  MediaState,
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
  constructor(
    private readonly configProvider: ConfigProvider,
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>
  ) {}

  removeImages$(
    state: MediaState,
    documentModel: DocumentModel
  ): Observable<DocumentModel> {
    if (
      documentModel.images.filter((image) => image.state === state).length === 0
    ) {
      return of(documentModel);
    }

    return from(documentModel.images).pipe(
      filter((image) => image.state === state),
      concatMap((image) => this.remove$(image, documentModel))
    );
  }

  remove$(
    image: Image,
    documentModel: DocumentModel
  ): Observable<DocumentModel> {
    const imageId = image.id;
    const entityId = documentModel._id;
    return this.removeImageBlobs$(
      image.state,
      image.blobPathId,
      image.fileName,
      documentModel.imageDimensions.filter(
        (imageDimension) => imageDimension.id === imageId
      )
    ).pipe(
      concatMap(() =>
        from(this.entityModel.findById(entityId)).pipe(
          map(validateEntityFound),
          concatMap((documentModel) => {
            return from(
              this.entityModel.findByIdAndUpdate(entityId, {
                images: [
                  ...documentModel.images.filter(
                    (image) => image.id !== imageId
                  ),
                ],
                imageDimensions: [
                  ...documentModel.imageDimensions.filter(
                    (imageDimension) => imageDimension.imageId !== imageId
                  ),
                ],
                comments: [
                  ...documentModel.comments.filter(
                    (comment) => comment.mediaId !== imageId
                  ),
                ],
                emotions: [
                  ...documentModel.emotions.filter(
                    (emotion) => emotion.mediaId !== imageId
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
    state: MediaState,
    blobPathId: string,
    fileName: string,
    imageDimensions: ImageDimension[]
  ): Observable<boolean> {
    if (imageDimensions.length === 0) {
      return deleteBlob$(
        this.configProvider.getAzureStorageConnectionString(state),
        this.configProvider.getAzureStorageBlobContainerName(state),
        getAzureStorageBlobPath(blobPathId, fileName)
      );
    }

    return from(imageDimensions).pipe(
      concatMap((imageDimension) =>
        deleteBlob$(
          this.configProvider.getAzureStorageConnectionString(state),
          this.configProvider.getAzureStorageBlobContainerName(state),
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
          this.configProvider.getAzureStorageConnectionString(state),
          this.configProvider.getAzureStorageBlobContainerName(state),
          getAzureStorageBlobPath(blobPathId, fileName)
        )
      )
    );
  }
}
