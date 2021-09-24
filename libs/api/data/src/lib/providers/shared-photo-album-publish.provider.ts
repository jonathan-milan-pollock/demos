import { Injectable } from '@nestjs/common';

import { concatMap, from, map, Observable, of, pluck } from 'rxjs';
import { drive_v3 } from 'googleapis';

import { GoogleDriveFolder } from '@dark-rush-photography/shared/types';
import {
  createGoogleDriveFolder$,
  getGoogleDriveImageFiles$,
  moveGoogleDriveImageFile$,
} from '@dark-rush-photography/api/util';

import { DocumentModel } from '../schema/document.schema';
import { validateEntityGoogleDriveFolderId } from '../entities/entity-validation.functions';
import { ConfigProvider } from './config.provider';

@Injectable()
export class SharedPhotoAlbumPublishProvider {
  constructor(private readonly configProvider: ConfigProvider) {}

  createDarkRushPhotographySharedPhotoAlbumFolder$(
    googleDrive: drive_v3.Drive,
    documentModel: DocumentModel
  ): Observable<GoogleDriveFolder> {
    return createGoogleDriveFolder$(
      googleDrive,
      this.configProvider.googleDriveDarkRushPhotographySharedFolderId,
      documentModel.group
    ).pipe(
      pluck('id'),
      concatMap((darkRushPhotographySharedWithFolderId) =>
        createGoogleDriveFolder$(
          googleDrive,
          darkRushPhotographySharedWithFolderId,
          documentModel.slug
        )
      )
    );
  }

  publishSharedPhotoAlbumFolder$(
    googleDrive: drive_v3.Drive,
    documentModel: DocumentModel,
    darkRushPhotographySharedPhotoAlbumFolder: GoogleDriveFolder
  ): Observable<void> {
    const sharedPhotoAlbumFolderId =
      validateEntityGoogleDriveFolderId(documentModel);

    return from(
      getGoogleDriveImageFiles$(googleDrive, sharedPhotoAlbumFolderId)
    ).pipe(
      concatMap((imageFiles) => {
        if (imageFiles.length === 0) return of(undefined);

        return from(imageFiles).pipe(
          pluck('id'),
          concatMap((imageFileId) =>
            moveGoogleDriveImageFile$(
              googleDrive,
              imageFileId,
              sharedPhotoAlbumFolderId,
              darkRushPhotographySharedPhotoAlbumFolder.id
            )
          ),
          map(() => undefined)
        );
      })
    );
  }
}
