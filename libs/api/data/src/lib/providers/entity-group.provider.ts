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
import { ConfigProvider } from './config.provider';
import { EntityGroupFindProvider } from './entity-group-find.provider';

@Injectable()
export class EntityGroupProvider {
  constructor(
    private readonly configProvider: ConfigProvider,
    private readonly entityGroupFindProvider: EntityGroupFindProvider
  ) {}

  findGroups$(
    googleDrive: drive_v3.Drive,
    entityWithGroupType: EntityWithGroupType
  ): Observable<string[]> {
    const entityFolderName =
      getEntityWithGroupTypeFolderName(entityWithGroupType);
    return combineLatest([
      this.entityGroupFindProvider.findGroupsFromGoogleDriveFolderName$(
        googleDrive,
        entityFolderName,
        this.configProvider.getGoogleDriveWebsitesFolderId(
          WatermarkedType.Watermarked
        )
      ),
      this.entityGroupFindProvider.findGroupsFromGoogleDriveFolderName$(
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
