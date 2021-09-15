/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import {
  combineLatest,
  concatMap,
  distinct,
  forkJoin,
  from,
  last,
  map,
  mergeMap,
  Observable,
  of,
  pluck,
  toArray,
} from 'rxjs';
import { Model } from 'mongoose';
import { drive_v3 } from 'googleapis';

import { EntityType } from '@dark-rush-photography/shared/types';
import { GoogleDriveFolder } from '@dark-rush-photography/shared/types';
import {
  getGoogleDriveFolderById$,
  getGoogleDriveFolders$,
  getGoogleDriveFolderWithName$,
  googleDriveFolderWithNameExists$,
} from '@dark-rush-photography/api/util';

import { Document, DocumentModel } from '../schema/document.schema';
import {
  loadDocumentModelsArray,
  loadNewEntity,
} from '../entities/entity.functions';
import { validateEntityFound } from '../entities/entity-validation.functions';
import { ConfigProvider } from './config.provider';

@Injectable()
export class SharedPhotoAlbumProvider {
  private readonly logger: Logger;

  constructor(
    private readonly configProvider: ConfigProvider,
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>
  ) {
    this.logger = new Logger(SharedPhotoAlbumProvider.name);
  }

  loadGroups$(googleDrive: drive_v3.Drive): Observable<string[]> {
    return combineLatest([
      from(
        getGoogleDriveFolderById$(
          googleDrive,
          this.configProvider.googleDriveSharedWatermarkedFolderId
        )
      ),
      from(
        getGoogleDriveFolderById$(
          googleDrive,
          this.configProvider.googleDriveSharedWithoutWatermarkFolderId
        )
      ),
    ]).pipe(
      concatMap(([watermarkedFolder, withoutWatermarkFolder]) =>
        forkJoin([
          from(getGoogleDriveFolders$(googleDrive, watermarkedFolder.id)),
          from(getGoogleDriveFolders$(googleDrive, withoutWatermarkFolder.id)),
        ])
      ),
      mergeMap((sharedWithFolders) => from(sharedWithFolders)),
      concatMap((sharedWithFolders) => from(sharedWithFolders)),
      distinct((sharedWithFolder) => sharedWithFolder.name),
      pluck('name'),
      toArray<string>()
    );
  }

  createForGroup$(
    googleDrive: drive_v3.Drive,
    sharedWith: string
  ): Observable<void> {
    return this.findSharedWithFolder$(googleDrive, sharedWith).pipe(
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
              group: sharedWith,
              slug: sharedPhotoAlbumEntityFolder.name,
            })
          ),
        ])
      ),
      concatMap(([sharedPhotoAlbumEntityFolder, documentModels]) => {
        const documentModelsArray = loadDocumentModelsArray(documentModels);
        if (documentModelsArray.length > 0) {
          this.logger.log(`Found entity ${sharedPhotoAlbumEntityFolder.name}`);
          return of(documentModelsArray[0]);
        }

        this.logger.log(`Creating entity ${sharedPhotoAlbumEntityFolder.name}`);
        return from(
          new this.entityModel({
            ...loadNewEntity(
              EntityType.SharedPhotoAlbum,
              {
                group: sharedWith,
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

  findNewImagesFolder$(
    googleDrive: drive_v3.Drive,
    entityId: string
  ): Observable<{
    documentModel: DocumentModel;
    imagesFolder: GoogleDriveFolder;
  }> {
    return from(this.entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      concatMap((documentModel) =>
        combineLatest([
          of(documentModel),
          this.findSharedWithFolder$(googleDrive, documentModel.group),
        ])
      ),
      concatMap(([documentModel, socialMediaGroupFolder]) =>
        combineLatest([
          of(documentModel),
          getGoogleDriveFolderWithName$(
            googleDrive,
            socialMediaGroupFolder.id,
            documentModel.slug
          ),
        ])
      ),
      concatMap(([documentModel, socialMediaEntityFolder]) =>
        combineLatest([
          of(documentModel),
          getGoogleDriveFolderWithName$(
            googleDrive,
            socialMediaEntityFolder.id,
            'images'
          ),
        ])
      ),
      map(([documentModel, entityImagesFolder]) => {
        return {
          documentModel: documentModel,
          imagesFolder: entityImagesFolder,
        };
      })
    );
  }

  findSharedWithFolder$(
    googleDrive: drive_v3.Drive,
    sharedWith: string
  ): Observable<GoogleDriveFolder> {
    return combineLatest([
      from(
        getGoogleDriveFolderById$(
          googleDrive,
          this.configProvider.googleDriveSharedWatermarkedFolderId
        )
      ),
      from(
        getGoogleDriveFolderById$(
          googleDrive,
          this.configProvider.googleDriveSharedWithoutWatermarkFolderId
        )
      ),
    ]).pipe(
      concatMap(([watermarkedFolder, withoutWatermarkFolder]) =>
        combineLatest([
          of(watermarkedFolder),
          from(
            googleDriveFolderWithNameExists$(
              googleDrive,
              watermarkedFolder.id,
              sharedWith
            )
          ),
          of(withoutWatermarkFolder),
        ])
      ),
      concatMap(
        ([
          watermarkedSharedWithFolder,
          watermarkedSharedWithFolderExists,
          withoutWatermarkSharedWithFolder,
        ]) => {
          if (watermarkedSharedWithFolderExists) {
            return getGoogleDriveFolderWithName$(
              googleDrive,
              watermarkedSharedWithFolder.id,
              sharedWith
            );
          }
          return getGoogleDriveFolderWithName$(
            googleDrive,
            withoutWatermarkSharedWithFolder.id,
            sharedWith
          );
        }
      )
    );
  }
}
