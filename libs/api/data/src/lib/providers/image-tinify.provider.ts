/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable, Logger } from '@nestjs/common';
import { BlobUploadCommonResponse } from '@azure/storage-blob';

import { concatMap, from, Observable, tap } from 'rxjs';

import { Media } from '@dark-rush-photography/shared/types';
import {
  downloadBlobToFile$,
  getAzureStorageBlobPath,
  uploadBufferToBlob$,
} from '@dark-rush-photography/api/util';
import { ConfigProvider } from './config.provider';

@Injectable()
export class ImageTinifyProvider {
  private readonly logger: Logger;

  constructor(private readonly configProvider: ConfigProvider) {
    this.logger = new Logger(ImageTinifyProvider.name);
  }

  tinifyImage$(media: Media): Observable<BlobUploadCommonResponse> {
    return downloadBlobToFile$(
      this.configProvider.azureStorageConnectionStringPublic,
      this.configProvider.azureStorageBlobContainerNamePublic,
      getAzureStorageBlobPath(media.blobPathId, media.fileName),
      media.fileName
    ).pipe(
      concatMap((filePath) => {
        const tinify = require('tinify');
        tinify.default.key = this.configProvider.tinyPngApiKey;
        return from(tinify.fromFile(filePath).toBuffer());
      }),
      tap(() => this.logger.log(`Tinified image ${media.fileName}`)),
      concatMap((uint8Array) =>
        uploadBufferToBlob$(
          this.configProvider.azureStorageConnectionStringPublic,
          this.configProvider.azureStorageBlobContainerNamePublic,
          Buffer.from(uint8Array as Uint8Array),
          getAzureStorageBlobPath(media.blobPathId, media.fileName)
        )
      )
    );
  }
}
