import {
  combineLatest,
  concatMap,
  from,
  Observable,
  of,
  pluck,
  toArray,
} from 'rxjs';
import { drive_v3 } from 'googleapis';
import { Model } from 'mongoose';

import {
  EntityWithGroupType,
  WatermarkedType,
} from '@dark-rush-photography/shared/types';
import {
  findGoogleDriveFolderByName$,
  findGoogleDriveFolders$,
  getEntityTypeFromEntityWithGroupType,
} from '@dark-rush-photography/api/util';
import { DocumentModel } from '../schema/document.schema';
import { loadDocumentModelsArray } from './entity.functions';

export const findGroupsFromGoogleDriveFolderName$ = (
  googleDrive: drive_v3.Drive,
  entityFolderName: string,
  googleDriveWebsitesFolderId: string
): Observable<string[]> => {
  return findGoogleDriveFolderByName$(
    googleDrive,
    googleDriveWebsitesFolderId,
    entityFolderName
  ).pipe(
    concatMap((entityFolder) => {
      if (!entityFolder) return of([]);

      return findGoogleDriveFolders$(googleDrive, entityFolder.id).pipe(
        concatMap((groupFolders) => {
          if (groupFolders.length === 0) return of([]);

          return from(groupFolders).pipe(pluck('name'), toArray<string>());
        })
      );
    })
  );
};

export const findAllForGroup$ = (
  entityWithGroupType: EntityWithGroupType,
  group: string,
  entityModel: Model<DocumentModel>
): Observable<DocumentModel[]> => {
  return combineLatest([
    entityModel.find({
      type: getEntityTypeFromEntityWithGroupType(entityWithGroupType),
      watermarkedType: WatermarkedType.Watermarked,
      group,
    }),
    entityModel.find({
      type: getEntityTypeFromEntityWithGroupType(entityWithGroupType),
      watermarkedType: WatermarkedType.WithoutWatermark,
      group,
    }),
  ]).pipe(
    concatMap(([watermarkedImagePosts, withoutWatermarkImagePosts]) =>
      from([
        ...loadDocumentModelsArray(watermarkedImagePosts),
        ...loadDocumentModelsArray(withoutWatermarkImagePosts),
      ])
    ),
    toArray<DocumentModel>()
  );
};
