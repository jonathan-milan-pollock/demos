import { Injectable, Logger } from '@nestjs/common';

import { Observable } from 'rxjs';

import { GoogleDriveFolder } from '@dark-rush-photography/api/types';
import { getGoogleDrive } from '@dark-rush-photography/api/util';
import {
  ConfigProvider,
  SharedPhotoAlbumProvider,
  SharedWithProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class AdminSharedWithService {
  private readonly logger: Logger;

  constructor(
    private readonly configProvider: ConfigProvider,
    private readonly sharedWithProvider: SharedWithProvider,
    private readonly sharedPhotoAlbumProvider: SharedPhotoAlbumProvider
  ) {
    this.logger = new Logger(AdminSharedWithService.name);
  }

  findAll$(): Observable<GoogleDriveFolder[]> {
    const googleDrive = getGoogleDrive(
      this.configProvider.googleDriveClientEmail,
      this.configProvider.googleDrivePrivateKey
    );
    return this.sharedWithProvider.findSharedWithFolders$(googleDrive);
  }

  findOne$(sharedWithFolderId: string): Observable<GoogleDriveFolder[]> {
    const googleDrive = getGoogleDrive(
      this.configProvider.googleDriveClientEmail,
      this.configProvider.googleDrivePrivateKey
    );
    return this.sharedPhotoAlbumProvider.findPhotoAlbumFolders$(
      googleDrive,
      sharedWithFolderId
    );
  }
}
