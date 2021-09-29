import { from, map, Observable } from 'rxjs';
import { Model } from 'mongoose';

import {
  EntityType,
  WatermarkedType,
} from '@dark-rush-photography/shared/types';
import { DocumentModel } from '../schema/document.schema';
import { loadDocumentModelsArray } from './entity-load.functions';

export const findAllEntities$ = (
  entityType: EntityType,
  watermarkedType: WatermarkedType,
  entityModel: Model<DocumentModel>
): Observable<DocumentModel[]> => {
  return from(
    entityModel.find({
      type: entityType,
      watermarkedType,
    })
  ).pipe(map((documentModels) => loadDocumentModelsArray(documentModels)));
};

export const findAllEntitiesForGroup$ = (
  entityType: EntityType,
  watermarkedType: WatermarkedType,
  group: string,
  entityModel: Model<DocumentModel>
): Observable<DocumentModel[]> => {
  return from(
    entityModel.find({
      type: entityType,
      watermarkedType,
      group,
    })
  ).pipe(map((documentModels) => loadDocumentModelsArray(documentModels)));
};
