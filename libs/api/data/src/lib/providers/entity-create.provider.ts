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
  getEntityWithoutGroupTypeInitialSlug,
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
    const initialSlug = getEntityWithoutGroupTypeInitialSlug(
      entityWithoutGroupType
    );

    return this.entityCreateWatermarkedTypeProvider
      .createWatermarkedType$(
        googleDrive,
        folderName,
        entityWithoutGroupType,
        WatermarkedType.Watermarked,
        initialSlug
      )
      .pipe(
        concatMap(() =>
          this.entityCreateWatermarkedTypeProvider.createWatermarkedType$(
            googleDrive,
            folderName,
            entityWithoutGroupType,
            WatermarkedType.WithoutWatermark,
            initialSlug
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
