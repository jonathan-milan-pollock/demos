import { Injectable } from '@nestjs/common';

import {
  combineLatest,
  concatMap,
  distinct,
  from,
  Observable,
  toArray,
} from 'rxjs';
import { drive_v3 } from 'googleapis';

import {
  EntityWithGroupType,
  WatermarkedType,
} from '@dark-rush-photography/shared/types';
import { getEntityWithGroupTypeFolderName } from '@dark-rush-photography/api/util';
import { findGroupsFromGoogleDriveFolderName$ } from '../entities/entity-group.functions';
import { ConfigProvider } from './config.provider';

@Injectable()
export class EntityGroupProvider {
  constructor(private readonly configProvider: ConfigProvider) {}

  findGroups$(
    googleDrive: drive_v3.Drive,
    entityWithGroupType: EntityWithGroupType
  ): Observable<string[]> {
    const entityFolderName =
      getEntityWithGroupTypeFolderName(entityWithGroupType);
    return combineLatest([
      findGroupsFromGoogleDriveFolderName$(
        googleDrive,
        entityFolderName,
        this.configProvider.getGoogleDriveWebsitesFolderId(
          WatermarkedType.Watermarked
        )
      ),
      findGroupsFromGoogleDriveFolderName$(
        googleDrive,
        entityFolderName,
        this.configProvider.getGoogleDriveWebsitesFolderId(
          WatermarkedType.WithoutWatermark
        )
      ),
    ]).pipe(
      concatMap(([watermarkedGroups, withoutWatermarkGroups]) =>
        from([...watermarkedGroups, ...withoutWatermarkGroups])
      ),
      distinct(),
      toArray<string>()
    );
  }
}
