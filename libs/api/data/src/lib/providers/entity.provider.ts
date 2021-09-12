import { Injectable } from '@nestjs/common';

import { concatMap, filter, from, map, Observable, of } from 'rxjs';
import { Model } from 'mongoose';

import { EntityType } from '@dark-rush-photography/shared/types';
import { DocumentModel } from '../schema/document.schema';
import { loadDocumentModelsArray } from '../entities/entity.functions';
import {
  validateEntityType,
  validateEntityFound,
  validateEntityIsPosted,
} from '../entities/entity-validation.functions';

@Injectable()
export class EntityProvider {
  setIsPublishing$(
    entityType: EntityType,
    id: string,
    isPublishing: boolean,
    entityModel: Model<DocumentModel>
  ): Observable<void> {
    return from(entityModel.findById(id)).pipe(
      map(validateEntityFound),
      map((documentModel) => validateEntityType(entityType, documentModel)),
      concatMap(() =>
        from(entityModel.findByIdAndUpdate(id, { isPublishing: isPublishing }))
      ),
      map(() => undefined)
    );
  }

  findAll$(
    entityType: EntityType,
    entityModel: Model<DocumentModel>
  ): Observable<DocumentModel> {
    return from(entityModel.find({ type: entityType })).pipe(
      concatMap(loadDocumentModelsArray)
    );
  }

  findAllInGroup$(
    entityType: EntityType,
    group: string,
    entityModel: Model<DocumentModel>
  ): Observable<DocumentModel> {
    return from(entityModel.find({ type: entityType, group })).pipe(
      concatMap(loadDocumentModelsArray)
    );
  }

  findOne$(
    id: string,
    entityModel: Model<DocumentModel>
  ): Observable<DocumentModel> {
    return from(entityModel.findById(id)).pipe(map(validateEntityFound));
  }

  findAllPublic$(
    entityType: EntityType,
    entityModel: Model<DocumentModel>
  ): Observable<DocumentModel> {
    return from(entityModel.find({ type: entityType })).pipe(
      concatMap(loadDocumentModelsArray),
      filter((documentModel) => documentModel.isPublic)
    );
  }

  findOnePublic$(
    entityType: EntityType,
    id: string,
    entityModel: Model<DocumentModel>
  ): Observable<DocumentModel> {
    return from(entityModel.findById(id)).pipe(
      map(validateEntityFound),
      map(validateEntityIsPosted),
      map((documentModel) => validateEntityType(entityType, documentModel))
    );
  }
}
