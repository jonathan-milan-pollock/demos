import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { concatMap, map, Observable } from 'rxjs';
import { Model } from 'mongoose';

import { ImageAdmin, ImageUpdate } from '@dark-rush-photography/shared/types';
import { Document, DocumentModel } from '../schema/document.schema';
import { findEntityById$ } from '../entities/entity-repository.functions';
import { validateEntityFound } from '../entities/entity-validation.functions';
import { updateImage$ } from '../content/content-repository.functions';
import {
  validateImageFound,
  validateImageSelectedOrPublic,
} from '../content/content-validation.functions';
import { ImageFindProvider } from './image-find.provider';

@Injectable()
export class ImageUpdateProvider {
  constructor(
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly imageFindProvider: ImageFindProvider
  ) {}

  updateImage$(
    imageId: string,
    entityId: string,
    imageUpdate: ImageUpdate
  ): Observable<ImageAdmin> {
    return findEntityById$(entityId, this.entityModel).pipe(
      map(validateEntityFound),
      concatMap((documentModel) => {
        const image = validateImageFound(imageId, documentModel);
        validateImageSelectedOrPublic(image);
        return updateImage$(
          image,
          imageUpdate,
          documentModel,
          this.entityModel
        );
      }),
      concatMap(() => findEntityById$(entityId, this.entityModel)),
      map(validateEntityFound),
      concatMap(() => this.imageFindProvider.findOne$(imageId, entityId))
    );
  }
}
