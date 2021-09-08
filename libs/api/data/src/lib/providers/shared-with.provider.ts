import { Injectable } from '@nestjs/common';

import {
  combineLatest,
  concatMap,
  distinct,
  forkJoin,
  from,
  mergeMap,
  Observable,
  tap,
  toArray,
} from 'rxjs';
import { drive_v3 } from 'googleapis';

import { GoogleDriveFolder } from '@dark-rush-photography/api/types';
import {
  getGoogleDriveFolders$,
  getGoogleDriveFolderWithName$,
} from '@dark-rush-photography/api/util';
import { ConfigProvider } from './config.provider';
import { WebSocketMessageProvider } from './web-socket-message.provider';

@Injectable()
export class SharedWithProvider {
  constructor(
    private readonly configProvider: ConfigProvider,
    private readonly webSocketMessageProvider: WebSocketMessageProvider
  ) {}

  findSharedWithFolders$(
    googleDrive: drive_v3.Drive
  ): Observable<GoogleDriveFolder[]> {
    return from(
      getGoogleDriveFolderWithName$(
        googleDrive,
        this.configProvider.googleDriveDarkRushFolderId,
        'Lightroom Export'
      )
    ).pipe(
      tap(() => this.webSocketMessageProvider.sendMessage('got shared with')),
      concatMap((lightroomExportFolder) =>
        from(
          getGoogleDriveFolderWithName$(
            googleDrive,
            lightroomExportFolder.id,
            'Shared'
          )
        )
      ),
      concatMap((sharedFolder) =>
        combineLatest([
          from(
            getGoogleDriveFolderWithName$(
              googleDrive,
              sharedFolder.id,
              'Watermarked'
            )
          ),
          from(
            getGoogleDriveFolderWithName$(
              googleDrive,
              sharedFolder.id,
              'WithoutWatermark'
            )
          ),
        ])
      ),
      concatMap(([watermarkedFolder, withoutWatermarkFolder]) =>
        forkJoin([
          from(getGoogleDriveFolders$(googleDrive, watermarkedFolder.id)),
          from(getGoogleDriveFolders$(googleDrive, withoutWatermarkFolder.id)),
        ])
      ),
      mergeMap((folders) => from(folders)),
      concatMap((folders) => from(folders)),
      distinct((folder) => folder.id),
      toArray<GoogleDriveFolder>()
    );
  }
}
