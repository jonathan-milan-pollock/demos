import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import {
  combineLatest,
  concatMap,
  distinct,
  from,
  Observable,
  toArray,
} from 'rxjs';
import { Model } from 'mongoose';
import { drive_v3 } from 'googleapis';

import {
  EntityWithGroupType,
  WatermarkedType,
} from '@dark-rush-photography/shared/types';
import {
  getEntityTypeFromEntityWithGroupType,
  getEntityWithGroupTypeFolderName,
} from '@dark-rush-photography/api/util';
import { Document, DocumentModel } from '../schema/document.schema';
import { loadDocumentModelsArray } from '../entities/entity.functions';
import { findGroupsFromGoogleDriveFolderName$ } from '../entities/entity-group.functions';
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

  createForGroup$(
    googleDrive: drive_v3.Drive,
    entityWithGroupType: EntityWithGroupType,
    group: string
  ): Observable<void> {
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
        )
      );
  }

  findAllForGroup$(
    entityWithGroupType: EntityWithGroupType,
    group: string
  ): Observable<DocumentModel[]> {
    return combineLatest([
      this.entityModel.find({
        type: getEntityTypeFromEntityWithGroupType(entityWithGroupType),
        watermarkedType: WatermarkedType.Watermarked,
        group,
      }),
      this.entityModel.find({
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
  }
}
