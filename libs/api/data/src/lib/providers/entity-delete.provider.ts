import { Injectable } from '@nestjs/common';

import { Model } from 'mongoose';
import { combineLatest, concatMap, from, map, Observable, of } from 'rxjs';

import { EntityType } from '@dark-rush-photography/shared/types';
import { DocumentModel } from '../schema/document.schema';
import {
  validateEntityFound,
  validateEntityType,
} from '../entities/entity-validation.functions';
import { ImageRemoveProvider } from './image-remove.provider';
import { VideoRemoveProvider } from './video-remove.provider';

@Injectable()
export class EntityDeleteProvider {
  constructor(
    private readonly imageRemoveProvider: ImageRemoveProvider,
    private readonly videoRemoveProvider: VideoRemoveProvider
  ) {}

  delete$(
    entityType: EntityType,
    entityId: string,
    entityModel: Model<DocumentModel>
  ): Observable<void> {
    return from(entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      map((documentModel) => validateEntityType(entityType, documentModel)),
      concatMap((documentModel) =>
        combineLatest([from(documentModel.images), of(documentModel)])
      ),
      concatMap(([image, documentModel]) =>
        this.imageRemoveProvider.remove$(image, documentModel, entityModel)
      ),
      concatMap((documentModel) =>
        combineLatest([from(documentModel.videos), of(documentModel)])
      ),
      concatMap(([video, documentModel]) =>
        this.videoRemoveProvider.remove$(video, documentModel, entityModel)
      ),
      map(() => undefined)
    );
  }
}
