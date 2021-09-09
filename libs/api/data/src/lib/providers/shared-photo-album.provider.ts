/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository, Repository } from '@nestjs/azure-database';

import {
  combineLatest,
  concatMap,
  concatMapTo,
  from,
  lastValueFrom,
  map,
  Observable,
  of,
  toArray,
} from 'rxjs';
import { drive_v3 } from 'googleapis';

import {
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
} from '@dark-rush-photography/api/util';
import { SharedPhotoAlbumTable } from '@dark-rush-photography/shared-server/data';
import { ConfigProvider } from './config.provider';

@Injectable()
export class SharedPhotoAlbumProvider {
  private readonly logger: Logger;
  private readonly smallResolution: ImageResolution;
  private readonly mediumResolution: ImageResolution;

  constructor(
    private readonly configProvider: ConfigProvider,
    @InjectRepository(SharedPhotoAlbumTable)
    private readonly sharedPhotoAlbumRepository: Repository<SharedPhotoAlbumTable>
  ) {
    this.logger = new Logger(SharedPhotoAlbumProvider.name);
    this.smallResolution = this.configProvider.findImageResolution(
      ImageDimensionType.Small
    );
    this.mediumResolution = this.configProvider.findImageResolution(
      ImageDimensionType.Medium
    );
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
}
