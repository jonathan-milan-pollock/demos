import * as fs from 'fs-extra';
import * as path from 'path';
import * as os from 'os';
import { BadRequestException } from '@nestjs/common';

import { v4 as uuidv4 } from 'uuid';
import { from, map, Observable } from 'rxjs';
import { drive_v3 } from 'googleapis';

import {
  GoogleDriveFile,
  GoogleDriveFolder,
} from '@dark-rush-photography/shared-server/types';

export const getGoogleDriveFolderWithName$ = (
  drive: drive_v3.Drive,
  parentFolderId: string,
  folderName: string
): Observable<GoogleDriveFolder> => {
  return from(
    drive.files.list({
      q: `'${parentFolderId}' in parents and name = '${folderName}' and mimeType = 'application/vnd.google-apps.folder'`,
    })
  ).pipe(
    map((res) => {
      if (!res.data || !res.data.files || res.data.files.length === 0)
        throw new BadRequestException('Could not find folder');

      if (res.data.files.length > 1) {
        throw new BadRequestException('More that one folder found');
      }
      return res.data.files[0] as GoogleDriveFolder;
    })
  );
};

export const getGoogleDriveFolders$ = (
  drive: drive_v3.Drive,
  parentFolderId: string
): Observable<GoogleDriveFolder[]> => {
  return from(
    drive.files.list({
      q: `'${parentFolderId}' in parents and mimeType = 'application/vnd.google-apps.folder'`,
    })
  ).pipe(map((res) => res.data.files as GoogleDriveFolder[]));
};

export const getGoogleDriveImages$ = (
  drive: drive_v3.Drive,
  folderId: string
): Observable<GoogleDriveFile[]> => {
  return from(
    drive.files.list({
      fields: 'files(id, name, parents, mimeType)',
      q: `'${folderId}' in parents and trashed = false and mimeType = 'image/jpeg'`,
    })
  ).pipe(map((res) => res.data.files as GoogleDriveFile[]));
};

export const writeGoogleDriveFileToPath = (
  drive: drive_v3.Drive,
  fileId: string
): Promise<string> => {
  return drive.files
    .get({ fileId, alt: 'media' }, { responseType: 'stream' })
    .then((res) => {
      return new Promise((resolve, reject) => {
        const filePath = path.join(os.tmpdir(), uuidv4());
        console.log(`writing to ${filePath}`);
        const dest = fs.createWriteStream(filePath);
        res.data
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
