import * as fs from 'fs-extra';
import { Readable } from 'stream';
import { Injectable } from '@nestjs/common';

import { concatMap, from, Observable } from 'rxjs';
import { drive_v3 } from 'googleapis';

import {
  GoogleDriveFile,
  Image,
  ImageDimensionType,
  IMAGE_MIME_TYPE,
} from '@dark-rush-photography/shared/types';
import {
  downloadGoogleDriveImageFile,
  getAzureStorageBlobPath,
  getAzureStorageBlobPathWithImageDimension,
  uploadAzureStorageStreamToBlob$,
} from '@dark-rush-photography/api/util';
import { ConfigProvider } from './config.provider';

@Injectable()
export class ImageAddBlobProvider {
  constructor(private readonly configProvider: ConfigProvider) {}

  addNewImageBlob$(
    googleDrive: drive_v3.Drive,
    imageFile: GoogleDriveFile,
    image: Image
  ): Observable<void> {
    return from(downloadGoogleDriveImageFile(googleDrive, imageFile.id)).pipe(
      concatMap((filePath) =>
        uploadAzureStorageStreamToBlob$(
          fs.createReadStream(filePath),
          IMAGE_MIME_TYPE,
          getAzureStorageBlobPath(image.storageId, image.fileName),
          this.configProvider.azureStorageConnectionStringPublic,
          this.configProvider.azureStorageBlobContainerNamePublic
        )
      )
    );
  }

  addUploadImageBlob$(
    image: Image,
    file: Express.Multer.File
  ): Observable<void> {
    return uploadAzureStorageStreamToBlob$(
      Readable.from(file.buffer),
      IMAGE_MIME_TYPE,
      getAzureStorageBlobPath(image.storageId, image.fileName),
      this.configProvider.azureStorageConnectionStringPublic,
      this.configProvider.azureStorageBlobContainerNamePublic
    );
  }

  addImageDimensionBlob$(
    storageId: string,
    fileName: string,
    imageDimensionType: ImageDimensionType,
    imageFilePath: string
  ): Observable<void> {
    return uploadAzureStorageStreamToBlob$(
      fs.createReadStream(imageFilePath),
      IMAGE_MIME_TYPE,
      getAzureStorageBlobPathWithImageDimension(
        storageId,
        fileName,
        imageDimensionType
      ),
      this.configProvider.azureStorageConnectionStringPublic,
      this.configProvider.azureStorageBlobContainerNamePublic
    );
  }
}
