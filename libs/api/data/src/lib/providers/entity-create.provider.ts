import { Injectable } from '@nestjs/common';

import { concatMap, Observable } from 'rxjs';
import { drive_v3 } from 'googleapis';

import {
  EntityWithGroupType,
  EntityWithoutGroupType,
  WatermarkedType,
} from '@dark-rush-photography/shared/types';
import {
  getEntityWithGroupTypeFolderName,
  getEntityWithoutGroupTypeFolderName,
  getEntityWithoutGroupTypeInitialPathname,
} from '@dark-rush-photography/shared/util';
import { EntityCreateWatermarkedTypeProvider } from './entity-create-watermarked-type.provider';

@Injectable()
export class EntityCreateProvider {
  constructor(
    private readonly entityCreateWatermarkedTypeProvider: EntityCreateWatermarkedTypeProvider
  ) {}

  create$(
    googleDrive: drive_v3.Drive,
    entityWithoutGroupType: EntityWithoutGroupType
  ): Observable<void> {
    const folderName = getEntityWithoutGroupTypeFolderName(
      entityWithoutGroupType
    );
    const initialPathname = getEntityWithoutGroupTypeInitialPathname(
      entityWithoutGroupType
    );

    return this.entityCreateWatermarkedTypeProvider
      .createWatermarkedType$(
        googleDrive,
        folderName,
        entityWithoutGroupType,
        WatermarkedType.Watermarked,
        initialPathname
      )
      .pipe(
        concatMap(() =>
          this.entityCreateWatermarkedTypeProvider.createWatermarkedType$(
            googleDrive,
            folderName,
            entityWithoutGroupType,
            WatermarkedType.WithoutWatermark,
            initialPathname
          )
        )
      );
  }

  createForGroup$(
    googleDrive: drive_v3.Drive,
    entityWithGroupType: EntityWithGroupType,
    group: string
  ): Observable<void> {
    const folderName = getEntityWithGroupTypeFolderName(entityWithGroupType);

    return this.entityCreateWatermarkedTypeProvider
      .createWatermarkedTypeForGroup$(
        googleDrive,
        folderName,
        entityWithGroupType,
        WatermarkedType.Watermarked,
        group
      )
      .pipe(
        concatMap(() =>
          this.entityCreateWatermarkedTypeProvider.createWatermarkedTypeForGroup$(
            googleDrive,
            folderName,
            entityWithGroupType,
            WatermarkedType.WithoutWatermark,
            group
          )
        )
      );
  }
}
