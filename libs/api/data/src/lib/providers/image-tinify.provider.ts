/* eslint-disable @typescript-eslint/no-var-requires */
import { Readable } from 'stream';
import { Injectable } from '@nestjs/common';

import { concatMap, from, Observable } from 'rxjs';

import {
  IMAGE_FILE_EXTENSION,
  IMAGE_MIME_TYPE,
} from '@dark-rush-photography/shared/types';
import {
  downloadAzureStorageBlobToFile$,
  getAzureStorageBlobPath,
  getImageFileName,
  uploadAzureStorageStreamToBlob$,
} from '@dark-rush-photography/api/util';
import { ConfigProvider } from './config.provider';

@Injectable()
export class ImageTinifyProvider {
  constructor(private readonly configProvider: ConfigProvider) {}

  tinifyImage$(storageId: string, slug: string): Observable<void> {
    return downloadAzureStorageBlobToFile$(
      getAzureStorageBlobPath(storageId, slug, IMAGE_FILE_EXTENSION),
      getImageFileName(slug),
      this.configProvider.azureStorageConnectionStringPublic,
      this.configProvider.azureStorageBlobContainerNamePublic
    ).pipe(
      concatMap((filePath) => {
        const tinify = require('tinify');
        tinify.default.key = this.configProvider.tinyPngApiKey;
        return from(tinify.fromFile(filePath).toBuffer());
      }),
      concatMap((uint8Array) =>
        uploadAzureStorageStreamToBlob$(
          Readable.from(Buffer.from(uint8Array as Uint8Array)),
          IMAGE_MIME_TYPE,
          getAzureStorageBlobPath(storageId, slug, IMAGE_FILE_EXTENSION),
          this.configProvider.azureStorageConnectionStringPublic,
          this.configProvider.azureStorageBlobContainerNamePublic
        )
      )
    );
  }
}
