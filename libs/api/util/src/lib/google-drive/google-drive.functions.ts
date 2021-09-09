import * as fs from 'fs-extra';
import * as path from 'path';
import * as os from 'os';
import { BadRequestException } from '@nestjs/common';

import { v4 as uuidv4 } from 'uuid';
import { from, map, mapTo, Observable } from 'rxjs';
import { drive_v3, google } from 'googleapis';

import {
  GoogleDriveFile,
  GoogleDriveFolder,
} from '@dark-rush-photography/api/types';

export const getGoogleDrive = (
  clientEmail: string,
  privateKey: string
): drive_v3.Drive => {
  const auth = new google.auth.JWT(
    clientEmail,
    undefined,
    privateKey.replace(/\\n/gm, '\n'),
    ['https://www.googleapis.com/auth/drive']
  );

  return google.drive({ version: 'v3', auth });
};

export const watchFolder$ = (
  drive: drive_v3.Drive,
  channelId: string,
  channelToken: string,
  folderId: string,
  pushNotificationAddress: string
): Observable<boolean> => {
  return from(
    drive.files.watch({
      fileId: folderId,
      requestBody: {
        id: channelId,
        token: channelToken,
        type: 'web_hook',
        address: pushNotificationAddress,
      },
    })
  ).pipe(map((response) => response.status == 200));
};

export const getGoogleDriveFolderWithName$ = (
  googleDrive: drive_v3.Drive,
  parentFolderId: string,
  folderName: string
): Observable<GoogleDriveFolder> => {
  return from(
    googleDrive.files.list({
      q: `'${parentFolderId}' in parents and name = '${folderName}' and mimeType = 'application/vnd.google-apps.folder'`,
      fields: 'files(id, name)',
    })
  ).pipe(
    map((response) => {
      if (
        !response.data ||
        !response.data.files ||
        response.data.files.length === 0
      )
        throw new BadRequestException(`Could not find folder ${folderName}`);

      if (response.data.files.length > 1) {
        throw new BadRequestException('More that one folder found');
      }
      return response.data.files[0] as GoogleDriveFolder;
    })
  );
};

export const getGoogleDriveFolderById$ = (
  googleDrive: drive_v3.Drive,
  folderId: string
): Observable<GoogleDriveFolder> => {
  return from(
    googleDrive.files.get({
      fileId: folderId,
      fields: 'id, name',
    })
  ).pipe(map((response) => response.data as GoogleDriveFolder));
};

export const getGoogleDriveFolders$ = (
  googleDrive: drive_v3.Drive,
  parentFolderId: string
): Observable<GoogleDriveFolder[]> => {
  return from(
    googleDrive.files.list({
      q: `'${parentFolderId}' in parents and trashed = false and mimeType = 'application/vnd.google-apps.folder'`,
      fields: 'files(id, name)',
    })
  ).pipe(map((response) => response.data.files as GoogleDriveFolder[]));
};

export const getGoogleDriveImageFiles$ = (
  googleDrive: drive_v3.Drive,
  folderId: string
): Observable<GoogleDriveFile[]> => {
  return from(
    googleDrive.files.list({
      q: `'${folderId}' in parents and trashed = false and mimeType = 'image/jpeg'`,
      fields: 'files(id, name)',
    })
  ).pipe(map((response) => response.data.files as GoogleDriveFile[]));
};

export const getGoogleDriveFolderParents$ = (
  googleDrive: drive_v3.Drive,
  folderId: string
): Observable<string[]> => {
  return from(
    googleDrive.files.get({
      fileId: folderId,
      fields: 'parents',
    })
  ).pipe(map((response) => response.data.parents ?? []));
};

export const downloadGoogleDriveFile = (
  googleDrive: drive_v3.Drive,
  fileId: string
): Promise<string> => {
  return googleDrive.files
    .get({ fileId, alt: 'media' }, { responseType: 'stream' })
    .then((response) => {
      return new Promise((resolve, reject) => {
        const filePath = path.join(os.tmpdir(), uuidv4());
        console.log(`writing to ${filePath}`);
        const dest = fs.createWriteStream(filePath);
        response.data
          .on('end', () => {
            console.log('Done downloading file.');
            resolve(filePath);
          })
          .on('error', (err) => {
            console.error('Error downloading file.');
            reject(err);
          })
          .pipe(dest);
      });
    });
};

export const createGoogleDriveFolder$ = (
  googleDrive: drive_v3.Drive,
  parentFolderIds: string[],
  folderName: string
): Observable<GoogleDriveFolder> => {
  return from(
    googleDrive.files.create({
      fields: 'id, name',
      requestBody: {
        name: folderName,
        parents: [...parentFolderIds],
        mimeType: 'application/vnd.google-apps.folder',
      },
    })
  ).pipe(map((response) => response.data as GoogleDriveFolder));
};

export const copyGoogleDriveImageFile$ = (
  googleDrive: drive_v3.Drive,
  imageId: string,
  name: string,
  addParents: string[],
  removeParents: string[]
): Observable<GoogleDriveFile> => {
  return from(
    googleDrive.files.update({
      fileId: imageId,
      addParents: addParents.join(', '),
      removeParents: removeParents.join(', '),
      requestBody: {
        name: name,
      },
    })
  ).pipe(map((response) => response.data as GoogleDriveFile));
};

export const deleteGoogleDriveFolder$ = (
  googleDrive: drive_v3.Drive,
  folderId: string
): Observable<void> => {
  return from(
    googleDrive.files.delete({
      fileId: folderId,
    })
  ).pipe(mapTo(undefined));
};
