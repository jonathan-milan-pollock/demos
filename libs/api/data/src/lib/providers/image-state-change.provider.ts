import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { concatMap, from, map, Observable } from 'rxjs';
import { Model } from 'mongoose';

import { ImageAdmin, ImageState } from '@dark-rush-photography/shared/types';
import { Document, DocumentModel } from '../schema/document.schema';
import { validateEntityFound } from '../entities/entity-validation.functions';
import { changeState$ } from '../content/image-state-change.functions';
import {
  validateCanArchiveImage,
  validateCanMakeImagePublic,
  validateCanSelectImage,
  validateCanUnarchiveImage,
  validateImageFoundInEntity,
} from '../content/content-validation.functions';
import { ConfigProvider } from './config.provider';
import { ImageFindProvider } from './image-find.provider';

@Injectable()
export class ImageStateChangeProvider {
  constructor(
    private readonly configProvider: ConfigProvider,
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly imageFindProvider: ImageFindProvider
  ) {}

  select$(imageId: string, entityId: string): Observable<ImageAdmin> {
    return from(this.entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      map((documentModel) =>
        validateImageFoundInEntity(imageId, documentModel)
      ),
      map(validateCanSelectImage),
      concatMap(() =>
        changeState$(imageId, entityId, ImageState.Selected, this.entityModel)
      ),
      concatMap(() => this.imageFindProvider.findOne$(imageId, entityId))
    );
  }

  archive$(imageId: string, entityId: string): Observable<ImageAdmin> {
    return from(this.entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      map((documentModel) =>
        validateImageFoundInEntity(imageId, documentModel)
      ),
      map(validateCanArchiveImage),
      concatMap(() =>
        changeState$(imageId, entityId, ImageState.Archived, this.entityModel)
      ),
      concatMap(() => this.imageFindProvider.findOne$(imageId, entityId))
    );
  }

  makeImagePublic$(imageId: string, entityId: string): Observable<ImageAdmin> {
    return from(this.entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      map((documentModel) =>
        validateImageFoundInEntity(imageId, documentModel)
      ),
      map(validateCanMakeImagePublic),
      concatMap(() =>
        changeState$(imageId, entityId, ImageState.Public, this.entityModel)
      ),
      concatMap(() => this.imageFindProvider.findOne$(imageId, entityId))
    );
  }

  unarchive$(imageId: string, entityId: string): Observable<ImageAdmin> {
    return from(this.entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      map((documentModel) =>
        validateImageFoundInEntity(imageId, documentModel)
      ),
      map(validateCanUnarchiveImage),
      concatMap(() =>
        changeState$(imageId, entityId, ImageState.Public, this.entityModel)
      ),
      concatMap(() => this.imageFindProvider.findOne$(imageId, entityId))
    );
  }
}
