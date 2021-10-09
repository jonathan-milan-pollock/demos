import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { catchError, concatMap, from, map, Observable, of } from 'rxjs';
import { Model } from 'mongoose';

import { ImageState } from '@dark-rush-photography/shared/types';
import {
  getEntityTypeRenameMediaWithSlug,
  getPublishFileName,
} from '@dark-rush-photography/api/util';
import { Document, DocumentModel } from '../schema/document.schema';
import { validateEntityFound } from '../entities/entity-validation.functions';
import { publishImage$ } from '../content/content-repository.functions';

@Injectable()
export class EntityPublishProvider {
  constructor(
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>
  ) {}

  publishEntity$(entityId: string, postSocialMedia: boolean): Observable<void> {
    return from(this.entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      concatMap(() =>
        from(
          this.entityModel.findByIdAndUpdate(entityId, {
            isProcessing: true,
          })
        )
      ),
      map(validateEntityFound),
      map((documentModel) => {
        const imagesToPublish = documentModel.images.filter(
          (image) =>
            image.state === ImageState.Selected ||
            image.state === ImageState.Public
        );
        if (imagesToPublish.length === 0) return of(undefined);

        return from(imagesToPublish).pipe(
          concatMap((image) => {
            let fileName = image.fileName;
            const renameMediaWithSlug = getEntityTypeRenameMediaWithSlug(
              documentModel.type
            );
            if (renameMediaWithSlug) {
              fileName = getPublishFileName(
                documentModel.slug,
                image.order,
                image.fileName,
                renameMediaWithSlug
              );
            }
            return from(this.entityModel.findById(entityId)).pipe(
              map(validateEntityFound),
              concatMap((documentModel) =>
                publishImage$(
                  image,
                  fileName,
                  new Date(),
                  documentModel,
                  this.entityModel
                )
              )
            );
          })
        );
      }),
      concatMap(() =>
        from(
          this.entityModel.findByIdAndUpdate(entityId, {
            isProcessing: false,
            isPublished: true,
          })
        )
      ),
      catchError(() =>
        from(
          this.entityModel.findByIdAndUpdate(entityId, {
            isProcessing: false,
          })
        )
      ),
      map(() => undefined)
    );
  }
}
