import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import {
  combineLatest,
  concatMap,
  from,
  Observable,
  of,
  pluck,
  toArray,
} from 'rxjs';
import { Model } from 'mongoose';
import { drive_v3 } from 'googleapis';

import {
  EntityType,
  EntityWithGroupType,
  WatermarkedType,
} from '@dark-rush-photography/shared/types';
import {
  findGoogleDriveFolderByName$,
  findGoogleDriveFolders$,
  getEntityWithGroupTypeFolderName,
} from '@dark-rush-photography/api/util';
import { Document, DocumentModel } from '../schema/document.schema';
import { loadDocumentModelsArray } from '../entities/entity.functions';
import { ConfigProvider } from './config.provider';

@Injectable()
export class EntityGroupProvider {
  constructor(
    private readonly configProvider: ConfigProvider,
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>
  ) {}

  findGroups$(
    googleDrive: drive_v3.Drive,
    entityWithGroupType: EntityWithGroupType
  ): Observable<string[]> {
    const folderName = getEntityWithGroupTypeFolderName(entityWithGroupType);
    switch (entityWithGroupType) {
      case EntityWithGroupType.Event:
      case EntityWithGroupType.PhotoOfTheWeek:
      case EntityWithGroupType.SocialMedia:
        return findGoogleDriveFolderByName$(
          googleDrive,
          this.configProvider.googleDriveWebsitesWatermarkedFolderId,
          folderName
        ).pipe(
          concatMap((entityFolder) =>
            findGoogleDriveFolders$(googleDrive, entityFolder.id)
          ),
          concatMap((groupFolders) => {
            if (groupFolders.length === 0) return of([]);

            return from(groupFolders).pipe(pluck('name'), toArray<string>());
          })
        );
    }
  }

  findAllForGroup$(
    entityType: EntityType,
    group: string
  ): Observable<DocumentModel[]> {
    return of(entityType).pipe(
      concatMap(() =>
        combineLatest([
          this.entityModel.find({
            type: entityType,
            watermarkedType: WatermarkedType.Watermarked,
            group,
          }),
          this.entityModel.find({
            type: entityType,
            watermarkedType: WatermarkedType.WithoutWatermark,
            group,
          }),
        ])
      ),
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
