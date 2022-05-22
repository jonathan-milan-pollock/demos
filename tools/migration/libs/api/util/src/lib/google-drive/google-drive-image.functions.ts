/* istanbul ignore file */
import * as fs from 'fs-extra';
import * as path from 'path';
import * as os from 'os';
import { Logger } from '@nestjs/common';

import { v4 as uuidv4 } from 'uuid';
import { from, map, Observable } from 'rxjs';
import { drive_v3 } from 'googleapis';

import { GoogleDriveFile } from '@dark-rush-photography/shared/types';

export const getGoogleDriveImageFiles$ = (
  googleDrive: drive_v3.Drive,
  folderId: string
): Observable<GoogleDriveFile[]> =>
  from(
    googleDrive.files.list({
      q: `'${folderId}' in parents and trashed = false and mimeType = 'image/jpeg'`,
      fields: 'files(id, name)',
      pageSize: 1_000,
    })
  ).pipe(map((response) => response.data.files as GoogleDriveFile[]));

export const downloadGoogleDriveImageFile = (
  googleDrive: drive_v3.Drive,
  imageFileId: string
): Promise<string> => {
  const logger = new Logger(downloadGoogleDriveImageFile.name);
  return googleDrive.files
    .get({ fileId: imageFileId, alt: 'media' }, { responseType: 'stream' })
    .then((response) => {
      return new Promise((resolve, reject) => {
        const filePath = path.join(os.tmpdir(), uuidv4());
        logger.log(
          `Downloading Google Drive file ${imageFileId} to ${filePath}`
        );
        const writeStream = fs.createWriteStream(filePath);
        response.data
          .on('end', () => {
            logger.log(
              `Downloaded Google Drive file ${imageFileId} to ${filePath}`
            );
            resolve(filePath);
          })
          .on('error', (err) => {
            logger.error(
              `Error downloading Google Drive file ${imageFileId} to ${filePath}`
            );
            reject(err);
          })
          .pipe(writeStream);
      });
    });
};
