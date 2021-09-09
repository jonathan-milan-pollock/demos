/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable, Logger } from '@nestjs/common';

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
import { drive_v3 } from 'googleapis';

import {
  EntityType,
  ImageDimensionType,
  ImageResolution,
} from '@dark-rush-photography/shared/types';
import {
  GoogleDriveFile,
  GoogleDriveFolder,
  SharedImage,
  SharedPhotoAlbum,
} from '@dark-rush-photography/api/types';
import {
  downloadGoogleDriveFile,
  getGoogleDriveFolderById$,
  getGoogleDriveFolders$,
  getGoogleDriveImageFiles$,
  resizeImage$,
  findImageResolution,
  getGoogleDriveFolderWithName$,
  googleDriveFolderWithNameExists$,
} from '@dark-rush-photography/api/util';
import { ConfigProvider } from './config.provider';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Document, DocumentModel } from '../schema/document.schema';
import {
  loadDocumentModelsArray,
  loadNewEntity,
} from '../entities/entity.functions';

@Injectable()
export class SharedPhotoAlbumProvider {
  private readonly logger: Logger;
  private readonly smallResolution: ImageResolution;
  private readonly mediumResolution: ImageResolution;

  constructor(
    private readonly configProvider: ConfigProvider,
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>
  ) {
    this.logger = new Logger(SharedPhotoAlbumProvider.name);
    this.smallResolution = findImageResolution(ImageDimensionType.Small);
    this.mediumResolution = findImageResolution(ImageDimensionType.Medium);
  }

  findPhotoAlbumFolders$(
    googleDrive: drive_v3.Drive,
    sharedWithFolderId: string
  ): Observable<SharedPhotoAlbum[]> {
    return getGoogleDriveFolders$(googleDrive, sharedWithFolderId).pipe(
      concatMap((photoAlbumFolders) => from(photoAlbumFolders)),
      concatMap((photoAlbumFolder) =>
        combineLatest([
          of(photoAlbumFolder),
          getGoogleDriveImageFiles$(googleDrive, photoAlbumFolder.id),
        ])
      ),
      concatMap(([photoAlbumFolder, imageFiles]) =>
        this.loadAllPhotoAlbumImages$(googleDrive, photoAlbumFolder, imageFiles)
      ),
      toArray<SharedPhotoAlbum>()
    );
  }

  findPhotoAlbumFolder$(
    googleDrive: drive_v3.Drive,
    photoAlbumFolderId: string
  ): Observable<SharedPhotoAlbum> {
    return getGoogleDriveFolderById$(googleDrive, photoAlbumFolderId).pipe(
      concatMap((photoAlbumFolder) =>
        combineLatest([
          of(photoAlbumFolder),
          getGoogleDriveImageFiles$(googleDrive, photoAlbumFolderId),
        ])
      ),
      concatMap(([photoAlbumFolder, imageFiles]) =>
        this.loadAllPhotoAlbumImages$(googleDrive, photoAlbumFolder, imageFiles)
      )
    );
  }

  loadFirstPhotoAlbumImage$(
    googleDrive: drive_v3.Drive,
    sharedPhotoAlbumFolder: GoogleDriveFolder,
    sharedImageFiles: GoogleDriveFile[]
  ): Observable<SharedPhotoAlbum> {
    if (sharedImageFiles.length == 0) {
      return of({
        id: sharedPhotoAlbumFolder.id,
        name: sharedPhotoAlbumFolder.name,
        lowResDataUri: '',
        highResDataUri: '',
        imagesCount: sharedImageFiles.length,
      });
    }

    return of(sharedImageFiles[0]).pipe(
      concatMap((sharedImageFile) =>
        this.loadImageFileDataUri$(googleDrive, sharedImageFile)
      ),
      map((sharedImage) => {
        return {
          id: sharedPhotoAlbumFolder.id,
          name: sharedPhotoAlbumFolder.name,
          lowResDataUri: sharedImage.lowResDataUri,
          highResDataUri: sharedImage.highResDataUri,
          imagesCount: sharedImageFiles.length,
        };
      })
    );
  }

  loadAllPhotoAlbumImages$(
    googleDrive: drive_v3.Drive,
    sharedPhotoAlbumFolder: GoogleDriveFolder,
    sharedImageFiles: GoogleDriveFile[]
  ): Observable<SharedPhotoAlbum> {
    if (sharedImageFiles.length == 0) {
      return of({
        id: sharedPhotoAlbumFolder.id,
        name: sharedPhotoAlbumFolder.name,
        lowResDataUri: '',
        highResDataUri: '',
        imagesCount: sharedImageFiles.length,
      });
    }

    return from(sharedImageFiles).pipe(
      concatMap((sharedImageFile) =>
        this.loadImageFileDataUri$(googleDrive, sharedImageFile)
      ),
      map((sharedImage) => {
        return {
          id: sharedPhotoAlbumFolder.id,
          name: sharedPhotoAlbumFolder.name,
          lowResDataUri: sharedImage.lowResDataUri,
          highResDataUri: sharedImage.highResDataUri,
          imagesCount: sharedImageFiles.length,
        };
      })
    );
  }

  loadImageFileDataUri$(
    googleDrive: drive_v3.Drive,
    sharesImageFile: GoogleDriveFile
  ): Observable<SharedImage> {
    const datauri = require('datauri');
    return from(downloadGoogleDriveFile(googleDrive, sharesImageFile.id)).pipe(
      concatMap((filePath) =>
        combineLatest([
          resizeImage$(sharesImageFile.name, filePath, this.smallResolution),
          resizeImage$(sharesImageFile.name, filePath, this.mediumResolution),
        ])
      ),
      concatMap(([lowResFilePath, highResFilePath]) =>
        combineLatest([
          from(datauri(lowResFilePath)),
          from(datauri(highResFilePath)),
        ])
      ),
      map(([lowResDataUri, highResDataUri]) => {
        return {
          lowResDataUri: (lowResDataUri as { base64: string }).base64,
          highResDataUri: (highResDataUri as { base64: string }).base64,
        } as SharedImage;
      })
    );
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
      ),
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
            ...loadNewEntity(EntityType.SharedPhotoAlbum, {
              group: sharedWith,
              slug: sharedPhotoAlbumEntityFolder.name,
              isPosted: false,
            }),
          }).save()
        );
      }),
      last(),
      map(() => undefined)
    );
  }
}
