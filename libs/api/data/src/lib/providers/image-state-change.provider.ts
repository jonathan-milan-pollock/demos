import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { v4 as uuidv4 } from 'uuid';
import { concatMap, from, map, Observable } from 'rxjs';
import { Model } from 'mongoose';

import { ImageAdmin, ImageState } from '@dark-rush-photography/shared/types';
import { Document, DocumentModel } from '../schema/document.schema';
import { validateEntityFound } from '../entities/entity-validation.functions';
import { updateImageState$ } from '../content/content-repository.functions';
import {
  validateCanArchiveImage,
  validateCanSelectImage,
  validateCanUnarchiveImage,
  validateImageFound,
} from '../content/content-validation.functions';
import { ImageFindProvider } from './image-find.provider';

@Injectable()
export class ImageStateChangeProvider {
  constructor(
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly imageFindProvider: ImageFindProvider
  ) {}

  selectImage$(imageId: string, entityId: string): Observable<ImageAdmin> {
    return from(this.entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      concatMap((documentModel) => {
        const previousImage = validateImageFound(imageId, documentModel);
        validateCanSelectImage(previousImage);
        return updateImageState$(
          previousImage,
          uuidv4(),
          ImageState.Selected,
          documentModel,
          this.entityModel
        );
      }),
      concatMap(() => this.imageFindProvider.findOne$(imageId, entityId))
    );
  }

  archiveImage$(imageId: string, entityId: string): Observable<ImageAdmin> {
    return from(this.entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      concatMap((documentModel) => {
        const previousImage = validateImageFound(imageId, documentModel);
        validateCanArchiveImage(previousImage);
        return updateImageState$(
          previousImage,
          uuidv4(),
          ImageState.Archived,
          documentModel,
          this.entityModel
        );
      }),
      concatMap(() => this.imageFindProvider.findOne$(imageId, entityId))
    );
  }

  unarchiveImage$(imageId: string, entityId: string): Observable<ImageAdmin> {
    return from(this.entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      concatMap((documentModel) => {
        const previousImage = validateImageFound(imageId, documentModel);
        validateCanUnarchiveImage(previousImage);
        return updateImageState$(
          previousImage,
          uuidv4(),
          ImageState.Public,
          documentModel,
          this.entityModel
        );
      }),
      concatMap(() => this.imageFindProvider.findOne$(imageId, entityId))
    );
  }
}
