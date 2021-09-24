import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import {
  combineLatest,
  concatMap,
  from,
  last,
  map,
  Observable,
  of,
  pluck,
  toArray,
} from 'rxjs';
import { Model } from 'mongoose';
import { drive_v3 } from 'googleapis';

import {
  EntityType,
  Group,
  WatermarkedType,
} from '@dark-rush-photography/shared/types';
import { getGoogleDriveFolders$ } from '@dark-rush-photography/api/util';

import { Document, DocumentModel } from '../schema/document.schema';
import {
  loadDocumentModelsArray,
  loadNewEntity,
} from '../entities/entity.functions';
import { ConfigProvider } from './config.provider';
import { SharedPhotoAlbumProvider } from './shared-photo-album.provider';

@Injectable()
export class SharedPhotoAlbumLoadProvider {
  private readonly logger: Logger;

  constructor(
    private readonly configProvider: ConfigProvider,
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly sharedPhotoAlbumProvider: SharedPhotoAlbumProvider
  ) {
    this.logger = new Logger(SharedPhotoAlbumLoadProvider.name);
  }

  loadWatermarkedGroups$(googleDrive: drive_v3.Drive): Observable<Group[]> {
    return getGoogleDriveFolders$(
      googleDrive,
      this.configProvider.googleDriveSharedWatermarkedFolderId
    ).pipe(
      concatMap((sharedWithFolders) => from(sharedWithFolders)),
      pluck('name'),
      map((name) => ({
        watermarkedType: WatermarkedType.Watermarked,
        name,
      })),
      toArray<Group>()
    );
  }

  loadWithoutWatermarkGroups$(
    googleDrive: drive_v3.Drive
  ): Observable<Group[]> {
    return getGoogleDriveFolders$(
      googleDrive,
      this.configProvider.googleDriveSharedWithoutWatermarkFolderId
    ).pipe(
      concatMap((sharedWithFolders) => from(sharedWithFolders)),
      pluck('name'),
      map((name) => ({
        watermarkedType: WatermarkedType.WithoutWatermark,
        name,
      })),
      toArray<Group>()
    );
  }

  loadGroups$(googleDrive: drive_v3.Drive): Observable<Group[]> {
    return of(googleDrive).pipe(
      concatMap(() =>
        combineLatest([
          this.loadWatermarkedGroups$(googleDrive),
          this.loadWithoutWatermarkGroups$(googleDrive),
        ])
      ),
      concatMap(([watermarkedGroup, withoutWatermarkedGroup]) =>
        from([...watermarkedGroup, ...withoutWatermarkedGroup])
      ),
      toArray<Group>()
    );
  }

  createForGroup$(
    googleDrive: drive_v3.Drive,
    watermarkedType: WatermarkedType,
    group: string
  ): Observable<void> {
    return this.sharedPhotoAlbumProvider
      .findSharedWithFolder$(googleDrive, watermarkedType, group)
      .pipe(
        concatMap((sharedWithFolder) =>
          getGoogleDriveFolders$(googleDrive, sharedWithFolder.id)
        ),
        concatMap((sharedPhotoAlbumEntityFolders) =>
          from(sharedPhotoAlbumEntityFolders)
        ),
        concatMap((sharedPhotoAlbumEntityFolder) =>
          combineLatest([
            of(sharedPhotoAlbumEntityFolder),
            from(
              this.entityModel.find({
                type: EntityType.SharedPhotoAlbum,
                group,
                slug: sharedPhotoAlbumEntityFolder.name,
              })
            ),
          ])
        ),
        concatMap(([sharedPhotoAlbumEntityFolder, documentModels]) => {
          const documentModelsArray = loadDocumentModelsArray(documentModels);
          if (documentModelsArray.length > 0) {
            this.logger.log(
              `Found entity ${sharedPhotoAlbumEntityFolder.name}`
            );
            return of(documentModelsArray[0]);
          }

          this.logger.log(
            `Creating entity ${sharedPhotoAlbumEntityFolder.name}`
          );
          return from(
            new this.entityModel({
              ...loadNewEntity(
                EntityType.SharedPhotoAlbum,
                {
                  watermarkedType,
                  group,
                  slug: sharedPhotoAlbumEntityFolder.name,
                  isPublic: false,
                },
                sharedPhotoAlbumEntityFolder.id
              ),
            }).save()
          );
        }),
        last(),
        map(() => undefined)
      );
  }
}
