import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { concatMap, from, last, map, Observable, of } from 'rxjs';
import { Model } from 'mongoose';

import {
  ImageSelections,
  ImageState,
} from '@dark-rush-photography/shared/types';
import { Document, DocumentModel } from '../schema/document.schema';
import { validateEntityFound } from '../entities/entity-validation.functions';
import { updateImageState$ } from '../images/image-repository.functions';
import {
  validateCanArchiveImage,
  validateCanUnarchiveImage,
  validateImageFound,
} from '../images/image-validation.functions';
import { findEntityById$ } from '../entities/entity-repository.functions';

@Injectable()
export class ImageStateChangeProvider {
  constructor(
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>
  ) {}

  selectNewImages$(
    entityId: string,
    imageSelections: ImageSelections
  ): Observable<void> {
    if (imageSelections.imageIds.length === 0) return of(undefined);

    return from(imageSelections.imageIds).pipe(
      concatMap((imageId) =>
        findEntityById$(entityId, this.entityModel).pipe(
          map(validateEntityFound),
          concatMap((documentModel) => {
            const newImage = documentModel.images.find(
              (image) => image.id === imageId
            );

            if (!newImage || newImage.state !== ImageState.New)
              return of(undefined);

            return updateImageState$(
              newImage,
              ImageState.Selected,
              documentModel,
              this.entityModel
            );
          })
        )
      ),
      last(),
      map(() => undefined)
    );
  }

  archiveImage$(imageId: string, entityId: string): Observable<void> {
    return findEntityById$(entityId, this.entityModel).pipe(
      map(validateEntityFound),
      concatMap((documentModel) => {
        const previousImage = validateImageFound(imageId, documentModel.images);
        validateCanArchiveImage(previousImage);
        return updateImageState$(
          previousImage,
          ImageState.Archived,
          documentModel,
          this.entityModel
        );
      }),
      map(() => undefined)
    );
  }

  unarchiveImage$(imageId: string, entityId: string): Observable<void> {
    return findEntityById$(entityId, this.entityModel).pipe(
      map(validateEntityFound),
      concatMap((documentModel) => {
        const previousImage = validateImageFound(imageId, documentModel.images);
        validateCanUnarchiveImage(previousImage);
        return updateImageState$(
          previousImage,
          ImageState.Public,
          documentModel,
          this.entityModel
        );
      }),
      map(() => undefined)
    );
  }
}
