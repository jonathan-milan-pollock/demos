import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { concatMap, from, last, map, Observable, of } from 'rxjs';
import { Model } from 'mongoose';

import { ImageState } from '@dark-rush-photography/shared/types';
import { getEntityTypeHasImageVideo } from '@dark-rush-photography/shared/util';
import { Document, DocumentModel } from '../schema/document.schema';
import { findEntityById$ } from '../entities/entity-repository.functions';
import { validateEntityFound } from '../entities/entity-validation.functions';
import {
  addImageVideo$,
  updateImageState$,
} from '../images/image-repository.functions';

@Injectable()
export class ImagePublishProvider {
  constructor(
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>
  ) {}

  publishImages$(entityId: string): Observable<void> {
    return findEntityById$(entityId, this.entityModel).pipe(
      map(validateEntityFound),
      concatMap((documentModel) => {
        const imagesToPublish = documentModel.images.filter(
          (image) =>
            image.state === ImageState.Selected ||
            image.state === ImageState.Public
        );
        return from(imagesToPublish).pipe(
          concatMap((imageToPublish) => {
            return findEntityById$(entityId, this.entityModel).pipe(
              map(validateEntityFound),
              concatMap((documentModel) =>
                updateImageState$(
                  imageToPublish,
                  ImageState.Public,
                  documentModel,
                  this.entityModel
                )
              )
            );
          })
        );
      }),
      last(),
      map(() => undefined)
    );
  }

  publishImageVideo$(entityId: string): Observable<void> {
    return findEntityById$(entityId, this.entityModel).pipe(
      map(validateEntityFound),
      concatMap((documentModel) => {
        if (!getEntityTypeHasImageVideo(documentModel.type)) {
          return of(undefined);
        }
        if (!documentModel.imageVideo) return of(undefined);

        return findEntityById$(entityId, this.entityModel).pipe(
          map(validateEntityFound),
          concatMap((documentModel) => {
            if (!documentModel.imageVideo) return of(undefined);

            return addImageVideo$(
              documentModel.imageVideo,
              entityId,
              this.entityModel
            );
          })
        );
      }),
      map(() => undefined)
    );
  }
}
