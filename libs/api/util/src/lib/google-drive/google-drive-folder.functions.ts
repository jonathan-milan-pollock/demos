import { ConflictException } from '@nestjs/common';

import { from, map, Observable } from 'rxjs';
import { drive_v3 } from 'googleapis';

import { GoogleDriveFolder } from '@dark-rush-photography/shared/types';

export const findGoogleDriveFolders$ = (
  googleDrive: drive_v3.Drive,
  parentFolderId: string
): Observable<GoogleDriveFolder[]> =>
  from(
    googleDrive.files.list({
      q: `'${parentFolderId}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
      fields: 'files(id, name)',
      pageSize: 1_000,
    })
  ).pipe(map((response) => response.data.files as GoogleDriveFolder[]));

export const findGoogleDriveFolderById$ = (
  googleDrive: drive_v3.Drive,
  folderId: string
): Observable<GoogleDriveFolder> =>
  from(
    googleDrive.files.get({
      fileId: folderId,
      fields: 'id, name',
    })
  ).pipe(map((response) => response.data as GoogleDriveFolder));

export const findGoogleDriveFolderByName$ = (
  googleDrive: drive_v3.Drive,
  folderName: string,
  parentFolderId: string
): Observable<GoogleDriveFolder | undefined> =>
  from(
    googleDrive.files.list({
      q: `name = '${folderName}' and '${parentFolderId}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
      fields: 'files(id, name)',
    })
  ).pipe(
    map((response) => {
      const folders = response.data.files as GoogleDriveFolder[];
      if (folders.length === 1) {
        return folders[0];
      }

      if (folders.length > 1) {
        throw new ConflictException(
          `Found more that one Google Drive folder with name ${folderName}`
        );
      }
      return undefined;
    })
  );
