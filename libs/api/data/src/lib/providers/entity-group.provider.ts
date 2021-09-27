import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import {
  combineLatest,
  concatMap,
  distinct,
  from,
  map,
  Observable,
  of,
  toArray,
} from 'rxjs';
import { drive_v3 } from 'googleapis';
import { Model } from 'mongoose';

import {
  EntityMinimal,
  EntityWithGroupType,
  WatermarkedType,
} from '@dark-rush-photography/shared/types';
import { getEntityWithGroupTypeFolderName } from '@dark-rush-photography/api/util';
import { Document, DocumentModel } from '../schema/document.schema';
import { loadEntityMinimal } from '../entities/entity.functions';
import {
  findAllForGroup$,
  findGroupsFromGoogleDriveFolderName$,
} from '../entities/entity-group.functions';
import { ConfigProvider } from './config.provider';
import { EntityCreateProvider } from './entity-create.provider';

@Injectable()
export class EntityGroupProvider {
  constructor(
    private readonly configProvider: ConfigProvider,
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly entityCreateProvider: EntityCreateProvider
  ) {}

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

  findAllForGroup$(
    googleDrive: drive_v3.Drive,
    entityWithGroupType: EntityWithGroupType,
    group: string
  ): Observable<EntityMinimal[]> {
    const folderName = getEntityWithGroupTypeFolderName(entityWithGroupType);

    return this.entityCreateProvider
      .createForGroup$(
        googleDrive,
        folderName,
        entityWithGroupType,
        WatermarkedType.Watermarked,
        group
      )
      .pipe(
        concatMap(() =>
          this.entityCreateProvider.createForGroup$(
            googleDrive,
            folderName,
            entityWithGroupType,
            WatermarkedType.WithoutWatermark,
            group
          )
        ),
        concatMap(() =>
          from(findAllForGroup$(entityWithGroupType, group, this.entityModel))
        ),
        concatMap((documentModels) => {
          if (documentModels.length === 0) return of([]);

          return from(documentModels).pipe(
            map(loadEntityMinimal),
            toArray<EntityMinimal>()
          );
        })
      );
  }
}
