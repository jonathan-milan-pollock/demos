import { from, map, Observable } from 'rxjs';
import { drive_v3 } from 'googleapis';

import { GoogleDriveFolder } from '@dark-rush-photography/shared/types';
import { findGoogleDriveFolderByNameResponse } from './google-drive-folder-response.functions';

export const findGoogleDriveFolders$ = (
  googleDrive: drive_v3.Drive,
  parentFolderId: string
): Observable<GoogleDriveFolder[]> =>
  from(
    googleDrive.files.list({
      q: `'${parentFolderId}' in parents and trashed = false and mimeType = 'application/vnd.google-apps.folder'`,
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
      q: `'${parentFolderId}' in parents and trashed = false and name = '${folderName}' and mimeType = 'application/vnd.google-apps.folder'`,
      fields: 'files(id, name)',
    })
  ).pipe(
    map((response) =>
      findGoogleDriveFolderByNameResponse(
        folderName,
        response as {
          data?: {
            files?: GoogleDriveFolder[];
          };
        }
      )
    )
  );
