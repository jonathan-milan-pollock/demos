import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { concatMap, from, map, Observable } from 'rxjs';
import { Model } from 'mongoose';

import { ImageAdmin, ImageUpdate } from '@dark-rush-photography/shared/types';
import { Document, DocumentModel } from '../schema/document.schema';
import { validateEntityFound } from '../entities/entity-validation.functions';
import { updateImage$ } from '../content/image-update.functions';
import {
  validateImageFoundInEntity,
  validateImageSelectedOrPublic,
} from '../content/content-validation.functions';
import { ImageFindProvider } from './image-find.provider';

@Injectable()
export class ImageUpdateProvider {
  private readonly logger: Logger;

  constructor(
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly imageFindProvider: ImageFindProvider
  ) {
    this.logger = new Logger(ImageUpdateProvider.name);
  }

  update$(
    imageId: string,
    entityId: string,
    imageUpdate: ImageUpdate
  ): Observable<ImageAdmin> {
    return from(this.entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      concatMap(() => {
        return from(this.entityModel.findById(entityId)).pipe(
          map(validateEntityFound),
          map((documentModel) =>
            validateImageFoundInEntity(imageId, documentModel)
          ),
          map(validateImageSelectedOrPublic),
          concatMap(() =>
            updateImage$(imageId, entityId, imageUpdate, this.entityModel)
          )
        );
      }),
      concatMap(() => from(this.entityModel.findById(entityId))),
      map(validateEntityFound),
      concatMap(() => this.imageFindProvider.findOne$(imageId, entityId))
    );
  }
}
