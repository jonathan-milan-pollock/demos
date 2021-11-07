import { Injectable } from '@nestjs/common';

import { concatMap, map, Observable, of } from 'rxjs';
import { drive_v3 } from 'googleapis';

import {
  DEFAULT_ENTITY_GROUP,
  EntityWithGroupType,
  EntityWithoutGroupType,
  WatermarkedType,
} from '@dark-rush-photography/shared/types';
import {
  getEntityTypeFromEntityWithGroupType,
  getEntityTypeFromEntityWithoutGroupType,
} from '@dark-rush-photography/shared/util';
import { findGoogleDriveFolderByName$ } from '@dark-rush-photography/api/util';
import { ConfigProvider } from './config.provider';
import { EntityCreateAllForFolderProvider } from './entity-create-all-for-folder.provider';

@Injectable()
export class EntityCreateWatermarkedTypeProvider {
  constructor(
    private readonly configProvider: ConfigProvider,
    private readonly entityCreateAllForFolderProvider: EntityCreateAllForFolderProvider
  ) {}

  createWatermarkedType$(
    googleDrive: drive_v3.Drive,
    folderName: string,
    entityWithoutGroupType: EntityWithoutGroupType,
    watermarkedType: WatermarkedType,
    initialSlug?: string
  ): Observable<void> {
    return findGoogleDriveFolderByName$(
      googleDrive,
      folderName,
      this.configProvider.getGoogleDriveWebsitesFolderId(watermarkedType)
    ).pipe(
      concatMap((folder) => {
        if (!folder) return of(undefined);

        return this.entityCreateAllForFolderProvider.createAllEntitiesForFolder$(
          googleDrive,
          folder.id,
          getEntityTypeFromEntityWithoutGroupType(entityWithoutGroupType),
          watermarkedType,
          DEFAULT_ENTITY_GROUP,
          initialSlug
        );
      })
    );
  }

  createWatermarkedTypeForGroup$(
    googleDrive: drive_v3.Drive,
    folderName: string,
    entityWithGroupType: EntityWithGroupType,
    watermarkedType: WatermarkedType,
    group: string
  ): Observable<void> {
    return findGoogleDriveFolderByName$(
      googleDrive,
      folderName,
      this.configProvider.getGoogleDriveWebsitesFolderId(watermarkedType)
    ).pipe(
      concatMap((folder) => {
        if (!folder) return of(undefined);

        return findGoogleDriveFolderByName$(googleDrive, group, folder.id).pipe(
          concatMap((groupFolder) => {
            if (!groupFolder) return of(undefined);

            return this.entityCreateAllForFolderProvider.createAllEntitiesForFolder$(
              googleDrive,
              groupFolder.id,
              getEntityTypeFromEntityWithGroupType(entityWithGroupType),
              watermarkedType,
              group
            );
          })
        );
      }),
      map(() => undefined)
    );
  }
}
