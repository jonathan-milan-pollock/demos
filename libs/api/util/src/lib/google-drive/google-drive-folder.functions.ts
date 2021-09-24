import { Logger } from '@nestjs/common';

import { concatMap, from, map, Observable } from 'rxjs';
import { drive_v3 } from 'googleapis';

import { GoogleDriveFolder } from '@dark-rush-photography/shared/types';
import {
  getGoogleDriveFolderWithNameExistsResponse,
  getGoogleDriveFolderWithNameResponse,
} from './google-drive-folder-response.functions';

export const watchGoogleDriveFolder$ = (
  drive: drive_v3.Drive,
  channelId: string,
  channelToken: string,
  folderId: string,
  pushNotificationAddress: string
): Observable<boolean> =>
  from(
    drive.files.watch({
      fileId: folderId,
      requestBody: {
        id: channelId,
        token: channelToken,
        type: 'web_hook',
        address: pushNotificationAddress,
      },
    })
  ).pipe(map((response) => response.status === 200));

export const getGoogleDriveFolderWithNameExists$ = (
  googleDrive: drive_v3.Drive,
  parentFolderId: string,
  folderName: string
): Observable<boolean> =>
  from(
    googleDrive.files.list({
      q: `'${parentFolderId}' in parents and trashed = false and name = '${folderName}' and mimeType = 'application/vnd.google-apps.folder'`,
    })
  ).pipe(map(getGoogleDriveFolderWithNameExistsResponse));

export const getGoogleDriveFolderWithName$ = (
  googleDrive: drive_v3.Drive,
  parentFolderId: string,
  folderName: string
): Observable<GoogleDriveFolder> =>
  from(
    googleDrive.files.list({
      q: `'${parentFolderId}' in parents and trashed = false and name = '${folderName}' and mimeType = 'application/vnd.google-apps.folder'`,
      fields: 'files(id, name)',
    })
  ).pipe(
    map((response) =>
      getGoogleDriveFolderWithNameResponse(response, folderName)
    )
  );

export const getGoogleDriveFolderById$ = (
  googleDrive: drive_v3.Drive,
  folderId: string
): Observable<GoogleDriveFolder> =>
  from(
    googleDrive.files.get({
      fileId: folderId,
      fields: 'id, name',
    })
  ).pipe(map((response) => response.data as GoogleDriveFolder));

export const getGoogleDriveFolders$ = (
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

export const getGoogleDriveFolderParents$ = (
  googleDrive: drive_v3.Drive,
  folderId: string
): Observable<string[]> =>
  from(
    googleDrive.files.get({
      fileId: folderId,
      fields: 'parents',
    })
  ).pipe(map((response) => response.data.parents ?? []));

export const createGoogleDriveFolder$ = (
  googleDrive: drive_v3.Drive,
  parentFolderId: string,
  folderName: string
): Observable<GoogleDriveFolder> =>
  getGoogleDriveFolderWithNameExists$(
    googleDrive,
    parentFolderId,
    folderName
  ).pipe(
    concatMap((googleDriveFolderExists) => {
      if (googleDriveFolderExists)
        return getGoogleDriveFolderWithName$(
          googleDrive,
          parentFolderId,
          folderName
        );

      return from(
        googleDrive.files.create({
          fields: 'id, name',
          requestBody: {
            name: folderName,
            parents: [parentFolderId],
            mimeType: 'application/vnd.google-apps.folder',
          },
        })
      ).pipe(map((response) => response.data as GoogleDriveFolder));
    })
  );

export const deleteGoogleDriveFolder$ = (
  googleDrive: drive_v3.Drive,
  folderId: string
): Observable<void> => {
  return from(
    googleDrive.files.delete({
      fileId: folderId,
    })
  ).pipe(map(() => undefined));
};
