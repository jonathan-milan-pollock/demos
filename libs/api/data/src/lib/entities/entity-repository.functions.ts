/* istanbul ignore file */
import { from, map, Observable } from 'rxjs';
import { Model } from 'mongoose';

import {
  Entity,
  EntityType,
  EntityUpdate,
  WatermarkedType,
} from '@dark-rush-photography/shared/types';
import { DocumentModel } from '../schema/document.schema';
import {
  loadCreateImagePostEntity,
  loadDocumentModelsArray,
  loadUpdateEntity,
} from './entity-load-document-model.functions';

export const createEntity$ = (
  entity: Entity,
  entityModel: Model<DocumentModel>
): Observable<DocumentModel> => {
  return from(
    new entityModel({
      ...entity,
    }).save()
  );
};

export const createImagePostEntity$ = (
  entityType: EntityType,
  watermarkedType: WatermarkedType,
  group: string,
  slug: string,
  text: string,
  entityModel: Model<DocumentModel>
): Observable<DocumentModel> => {
  return from(
    new entityModel({
      ...loadCreateImagePostEntity(
        entityType,
        watermarkedType,
        group,
        slug,
        text
      ),
    }).save()
  );
};

export const updateEntity$ = (
  entityId: string,
  entityUpdate: EntityUpdate,
  entityModel: Model<DocumentModel>
): Observable<DocumentModel | null> => {
  return from(
    entityModel.findByIdAndUpdate(entityId, {
      ...loadUpdateEntity(entityUpdate),
    })
  );
};

export const findByIdAndUpdateIsProcessing$ = (
  entityId: string,
  isProcessing: boolean,
  entityModel: Model<DocumentModel>
): Observable<DocumentModel | null> => {
  return from(entityModel.findByIdAndUpdate(entityId, { isProcessing }));
};

export const findEntityById$ = (
  entityId: string,
  entityModel: Model<DocumentModel>
): Observable<DocumentModel | null> => from(entityModel.findById(entityId));

export const findOneEntity$ = (
  entityType: EntityType,
  watermarkedType: WatermarkedType,
  group: string,
  slug: string,
  entityModel: Model<DocumentModel>
): Observable<DocumentModel | null> => {
  return from(
    entityModel.findOne({
      type: entityType,
      watermarkedType,
      group,
      slug,
    })
  );
};

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

export const findAllPublicEntities$ = (
  entityType: EntityType,
  entityModel: Model<DocumentModel>
): Observable<DocumentModel[]> => {
  return from(
    entityModel.find({
      type: entityType,
      isPublic: true,
    })
  ).pipe(map((documentModels) => loadDocumentModelsArray(documentModels)));
};

export const findEntityByIdAndDelete$ = (
  entityId: string,
  entityModel: Model<DocumentModel>
): Observable<DocumentModel | null> =>
  from(entityModel.findByIdAndDelete(entityId));
