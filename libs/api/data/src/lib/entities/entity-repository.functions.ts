/* istanbul ignore file */
import { from, map, Observable } from 'rxjs';
import { Model } from 'mongoose';

import {
  Entity,
  EntityType,
  WatermarkedType,
} from '@dark-rush-photography/shared/types';
import { DocumentModel } from '../schema/document.schema';
import { loadDocumentModelsArray } from './entity-load-document-model.functions';

export const createNewEntity$ = (
  entity: Entity,
  entityModel: Model<DocumentModel>
): Observable<DocumentModel> => {
  return from(
    new entityModel({
      ...entity,
    }).save()
  );
};

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

export const findEntityById$ = (
  entityId: string,
  entityModel: Model<DocumentModel>
): Observable<DocumentModel | null> => from(entityModel.findById(entityId));

export const removeImageFromEntity$ = (
  imageId: string,
  entityId: string,
  documentModel: DocumentModel,
  entityModel: Model<DocumentModel>
): Observable<DocumentModel | null> =>
  from(
    entityModel.findByIdAndUpdate(entityId, {
      images: [...documentModel.images.filter((image) => image.id !== imageId)],
    })
  );

export const removeVideoFromEntity$ = (
  videoId: string,
  entityId: string,
  documentModel: DocumentModel,
  entityModel: Model<DocumentModel>
): Observable<DocumentModel | null> =>
  from(
    entityModel.findByIdAndUpdate(entityId, {
      videos: [...documentModel.videos.filter((video) => video.id !== videoId)],
    })
  );

export const findEntityByIdAndDelete$ = (
  entityId: string,
  entityModel: Model<DocumentModel>
): Observable<DocumentModel | null> =>
  from(entityModel.findByIdAndDelete(entityId));
