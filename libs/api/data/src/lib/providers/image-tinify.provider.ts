/* eslint-disable @typescript-eslint/no-var-requires */
import { Readable } from 'stream';
import { Injectable, Logger } from '@nestjs/common';

import { concatMap, from, Observable, tap } from 'rxjs';

import { IMAGE_MIME_TYPE } from '@dark-rush-photography/shared/types';
import {
  downloadAzureStorageBlobToFile$,
  getAzureStorageBlobPath,
  uploadAzureStorageStreamToBlob$,
} from '@dark-rush-photography/api/util';
import { ConfigProvider } from './config.provider';

@Injectable()
export class ImageTinifyProvider {
  private readonly logger: Logger;

  constructor(private readonly configProvider: ConfigProvider) {
    this.logger = new Logger(ImageTinifyProvider.name);
  }

  tinifyImage$(storageId: string, fileName: string): Observable<void> {
    return downloadAzureStorageBlobToFile$(
      getAzureStorageBlobPath(storageId, fileName),
      fileName,
      this.configProvider.azureStorageConnectionStringPublic,
      this.configProvider.azureStorageBlobContainerNamePublic
    ).pipe(
      concatMap((filePath) => {
        const tinify = require('tinify');
        tinify.default.key = this.configProvider.tinyPngApiKey;
        return from(tinify.fromFile(filePath).toBuffer());
      }),
      tap(() => this.logger.log(`Tinified image ${fileName}`)),
      concatMap((uint8Array) =>
        uploadAzureStorageStreamToBlob$(
          Readable.from(Buffer.from(uint8Array as Uint8Array)),
          IMAGE_MIME_TYPE,
          getAzureStorageBlobPath(storageId, fileName),
          this.configProvider.azureStorageConnectionStringPublic,
          this.configProvider.azureStorageBlobContainerNamePublic
        )
      )
    );
  }
}
