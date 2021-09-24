import { Injectable } from '@nestjs/common';

import { Observable } from 'rxjs';
import { drive_v3 } from 'googleapis';

import { WatermarkedType } from '@dark-rush-photography/shared/types';
import { GoogleDriveFolder } from '@dark-rush-photography/shared/types';
import { getGoogleDriveFolderWithName$ } from '@dark-rush-photography/api/util';

import { ConfigProvider } from './config.provider';

@Injectable()
export class SharedPhotoAlbumProvider {
  constructor(private readonly configProvider: ConfigProvider) {}

  findSharedWithFolder$(
    googleDrive: drive_v3.Drive,
    watermarkedType: WatermarkedType,
    group: string
  ): Observable<GoogleDriveFolder> {
    if (watermarkedType === WatermarkedType.Watermarked) {
      return getGoogleDriveFolderWithName$(
        googleDrive,
        this.configProvider.googleDriveSharedWatermarkedFolderId,
        group
      );
    }

    return getGoogleDriveFolderWithName$(
      googleDrive,
      this.configProvider.googleDriveSharedWithoutWatermarkFolderId,
      group
    );
  }
}
