import * as fs from 'fs-extra';

import { concatMap, from, map, Observable } from 'rxjs';
import { drive_v3 } from 'googleapis';

import { GoogleDriveFile, Image } from '@dark-rush-photography/shared/types';
import {
  downloadGoogleDriveImageFile,
  getAzureStorageBlobPath,
  uploadBufferToBlob$,
  uploadStreamToBlob$,
} from '@dark-rush-photography/api/util';

export const addNewImageBlob$ = (
  googleDrive: drive_v3.Drive,
  imageFile: GoogleDriveFile,
  image: Image,
  azureStorageConnectionStringPublic: string,
  azureStorageBlobContainerNamePublic: string
): Observable<Image> => {
  return from(downloadGoogleDriveImageFile(googleDrive, imageFile.id)).pipe(
    concatMap((filePath) =>
      uploadStreamToBlob$(
        azureStorageConnectionStringPublic,
        azureStorageBlobContainerNamePublic,
        fs.createReadStream(filePath),
        getAzureStorageBlobPath(image.storageId, image.fileName)
      )
    ),
    map(() => image)
  );
};

export const uploadImageBlob$ = (
  image: Image,
  file: Express.Multer.File,
  azureStorageConnectionStringPublic: string,
  azureStorageBlobContainerNamePublic: string
): Observable<Image> => {
  return uploadBufferToBlob$(
    azureStorageConnectionStringPublic,
    azureStorageBlobContainerNamePublic,
    file.buffer,
    getAzureStorageBlobPath(image.storageId, image.fileName)
  ).pipe(map(() => image));
};
