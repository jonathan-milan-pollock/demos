/* istanbul ignore file */
import { from, map, Observable } from 'rxjs';
import { Model } from 'mongoose';

import {
  EntityType,
  EntityUpdate,
  WatermarkedType,
} from '@dark-rush-photography/shared/types';
import { DocumentModel } from '../schema/document.schema';
import {
  loadCreateEntityForFolder,
  loadCreateImagePostEntity,
  loadCreateTestEntity,
  loadDocumentModelsArray,
} from './entity-load-document-model.functions';

export const createTestEntity$ = (
  entityModel: Model<DocumentModel>
): Observable<DocumentModel> =>
  from(
    new entityModel({
      ...loadCreateTestEntity(),
    }).save()
  );

export const createEntityForFolder$ = (
  entityType: EntityType,
  googleDriveFolderId: string,
  watermarkedType: WatermarkedType,
  group: string,
  slug: string,
  order: number,
  entityModel: Model<DocumentModel>
): Observable<DocumentModel> =>
  from(
    new entityModel({
      ...loadCreateEntityForFolder(
        entityType,
        googleDriveFolderId,
        watermarkedType,
        group,
        slug,
        order
      ),
    }).save()
  );

export const createImagePostEntity$ = (
  text: string,
  entityModel: Model<DocumentModel>
): Observable<DocumentModel> =>
  from(
    new entityModel({
      ...loadCreateImagePostEntity(text),
    }).save()
  );

export const updateEntity$ = (
  entityId: string,
  entityUpdate: EntityUpdate,
  entityModel: Model<DocumentModel>
): Observable<DocumentModel | null> =>
  from(
    entityModel.findByIdAndUpdate(entityId, {
      ...entityUpdate,
    })
  );

export const findEntityById$ = (
  entityId: string,
  entityModel: Model<DocumentModel>
): Observable<DocumentModel | null> => from(entityModel.findById(entityId));

export const findEntityByIdAndUpdateOrder$ = (
  entityId: string,
  order: number,
  entityModel: Model<DocumentModel>
): Observable<DocumentModel | null> =>
  from(entityModel.findByIdAndUpdate(entityId, { order }));

export const findEntityByIdAndMakePublic$ = (
  entityId: string,
  entityModel: Model<DocumentModel>
): Observable<DocumentModel | null> =>
  from(entityModel.findByIdAndUpdate(entityId, { isPublic: true }));

export const findPublicEntityById$ = (
  entityId: string,
  entityModel: Model<DocumentModel>
): Observable<DocumentModel | null> =>
  from(
    entityModel.findOne({
      _id: entityId,
      isPublic: true,
      isDeleted: false,
    })
  );

export const findOneEntity$ = (
  entityType: EntityType,
  watermarkedType: WatermarkedType,
  group: string,
  slug: string,
  entityModel: Model<DocumentModel>
): Observable<DocumentModel | null> =>
  from(
    entityModel.findOne({
      type: entityType,
      watermarkedType,
      group,
      slug,
    })
  );

export const findOnePublicEntityForSlug$ = (
  entityType: EntityType,
  slug: string,
  entityModel: Model<DocumentModel>
): Observable<DocumentModel | null> =>
  from(
    entityModel.findOne({
      type: entityType,
      slug,
      isPublic: true,
      isDeleted: false,
    })
  );

export const findAllEntities$ = (
  entityType: EntityType,
  watermarkedType: WatermarkedType,
  entityModel: Model<DocumentModel>
): Observable<DocumentModel[]> =>
  from(
    entityModel.find({
      type: entityType,
      watermarkedType,
      isDeleted: false,
    })
  ).pipe(map(loadDocumentModelsArray));

export const findAllEntitiesForWatermarkedGroup$ = (
  entityType: EntityType,
  watermarkedType: WatermarkedType,
  group: string,
  entityModel: Model<DocumentModel>
): Observable<DocumentModel[]> =>
  from(
    entityModel.find({
      type: entityType,
      watermarkedType,
      group,
      isDeleted: false,
    })
  ).pipe(map(loadDocumentModelsArray));

export const findAllEntitiesForGroup$ = (
  entityType: EntityType,
  group: string,
  entityModel: Model<DocumentModel>
): Observable<DocumentModel[]> =>
  from(
    entityModel.find({
      type: entityType,
      group,
      isDeleted: false,
    })
  ).pipe(map(loadDocumentModelsArray));

export const findAllTestEntities$ = (
  entityModel: Model<DocumentModel>
): Observable<DocumentModel[]> =>
  from(
    entityModel.find({
      type: EntityType.Test,
    })
  ).pipe(map(loadDocumentModelsArray));

export const findAllPublicEntities$ = (
  entityType: EntityType,
  entityModel: Model<DocumentModel>
): Observable<DocumentModel[]> =>
  from(
    entityModel.find({
      type: entityType,
      isPublic: true,
      isDeleted: false,
    })
  ).pipe(map(loadDocumentModelsArray));

export const findEntityByIdAndSoftDelete$ = (
  entityId: string,
  entityModel: Model<DocumentModel>
): Observable<DocumentModel | null> =>
  from(entityModel.findByIdAndUpdate(entityId, { isDeleted: true }));

export const findEntityByIdAndDelete$ = (
  entityId: string,
  entityModel: Model<DocumentModel>
): Observable<DocumentModel | null> =>
  from(entityModel.findByIdAndDelete(entityId));
