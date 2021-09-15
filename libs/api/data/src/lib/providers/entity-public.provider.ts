import { Injectable } from '@nestjs/common';

import { concatMap, from, map, Observable } from 'rxjs';
import { Model } from 'mongoose';

import { EntityType } from '@dark-rush-photography/shared/types';
import { DocumentModel } from '../schema/document.schema';
import { loadDocumentModelsArray } from '../entities/entity.functions';
import {
  validateEntityType,
  validateEntityFound,
  validateEntityIsPublic,
} from '../entities/entity-validation.functions';

@Injectable()
export class EntityPublicProvider {
  findAllPublic$(
    entityType: EntityType,
    entityModel: Model<DocumentModel>
  ): Observable<DocumentModel> {
    return from(entityModel.find({ type: entityType, isPublic: true })).pipe(
      concatMap(loadDocumentModelsArray)
    );
  }

  findOnePublic$(
    entityType: EntityType,
    id: string,
    entityModel: Model<DocumentModel>
  ): Observable<DocumentModel> {
    return from(entityModel.findById(id)).pipe(
      map(validateEntityFound),
      map(validateEntityIsPublic),
      map((documentModel) => validateEntityType(entityType, documentModel))
    );
  }
}
