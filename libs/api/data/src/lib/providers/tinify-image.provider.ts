/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable, Logger } from '@nestjs/common';
import { BlobUploadCommonResponse } from '@azure/storage-blob';

import { concatMap, from, Observable, tap } from 'rxjs';
const tinify = require('tinify');

import { Media } from '@dark-rush-photography/shared-server/types';
import {
  downloadBlobToFile$,
  getAzureStorageBlobPath,
  uploadBufferToBlob$,
} from '@dark-rush-photography/shared-server/util';
import { ConfigProvider } from './config.provider';

@Injectable()
export class TinifyImageProvider {
  private readonly logger: Logger;

  constructor(private readonly configProvider: ConfigProvider) {
    this.logger = new Logger(TinifyImageProvider.name);
  }

  tinifyImage$(media: Media): Observable<BlobUploadCommonResponse> {
    return downloadBlobToFile$(
      this.configProvider.azureStorageConnectionStringBlobs,
      getAzureStorageBlobPath(media),
      media.fileName
    ).pipe(
      concatMap((filePath) => {
        tinify.default.key = this.configProvider.tinyPngApiKey;
        return from(tinify.fromFile(filePath).toBuffer());
      }),
      tap(() => this.logger.log(`Tinified image ${media.fileName}`)),
      concatMap((uint8Array) =>
        uploadBufferToBlob$(
          this.configProvider.azureStorageConnectionStringBlobs,
          Buffer.from(uint8Array as Uint8Array),
          getAzureStorageBlobPath(media)
        )
      )
    );
  }
}
