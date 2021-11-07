import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { concatMap, map, Observable, of } from 'rxjs';
import { Model } from 'mongoose';

import { Image } from '@dark-rush-photography/shared/types';
import { Document, DocumentModel } from '../schema/document.schema';
import { findEntityById$ } from '../entities/entity-repository.functions';
import {
  removeImage$,
  removeImageVideo$,
} from '../images/image-repository.functions';
import { ImageDeleteBlobsProvider } from './image-delete-blobs.provider';

@Injectable()
export class ImageRemoveOneProvider {
  constructor(
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly imageDeleteBlobsProvider: ImageDeleteBlobsProvider
  ) {}

  removeImage$(image: Image): Observable<void> {
    return this.imageDeleteBlobsProvider
      .deleteImageBlobs$(image.storageId, image.slug)
      .pipe(
        concatMap(() => findEntityById$(image.entityId, this.entityModel)),
        concatMap((documentModel) => {
          if (!documentModel) return of(undefined);

          return removeImage$(
            image.id,
            image.entityId,
            documentModel,
            this.entityModel
          );
        }),
        map(() => undefined)
      );
  }

  removeImageVideo$(entityId: string): Observable<void> {
    return findEntityById$(entityId, this.entityModel).pipe(
      concatMap((documentModel) => {
        if (!documentModel) return of(undefined);

        if (!documentModel.imageVideo) return of(undefined);

        if (
          !documentModel.imageVideo.storageId ||
          !documentModel.imageVideo.slug
        ) {
          return of(undefined);
        }

        return this.imageDeleteBlobsProvider
          .deleteImageVideoBlob$(
            documentModel.imageVideo.storageId,
            documentModel.imageVideo.slug
          )
          .pipe(concatMap(() => removeImageVideo$(entityId, this.entityModel)));
      }),
      map(() => undefined)
    );
  }
}
