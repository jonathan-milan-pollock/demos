/* eslint-disable @typescript-eslint/no-var-requires */
import { Logger } from '@nestjs/common';

import { concatMap, from, Observable, tap } from 'rxjs';

import {
  downloadBlobToFile$,
  getAzureStorageBlobPath,
  uploadBufferToBlob$,
} from '@dark-rush-photography/api/util';

export const tinifyImage$ = (
  storageId: string,
  fileName: string,
  azureStorageConnectionStringPublic: string,
  azureStorageBlobContainerNamePublic: string,
  tinyPngApiKey: string
): Observable<void> => {
  const logger = new Logger(tinifyImage$.name);

  return downloadBlobToFile$(
    azureStorageConnectionStringPublic,
    azureStorageBlobContainerNamePublic,
    getAzureStorageBlobPath(storageId, fileName),
    fileName
  ).pipe(
    concatMap((filePath) => {
      const tinify = require('tinify');
      tinify.default.key = tinyPngApiKey;
      return from(tinify.fromFile(filePath).toBuffer());
    }),
    tap(() => logger.log(`Tinified image ${fileName}`)),
    concatMap((uint8Array) =>
      uploadBufferToBlob$(
        azureStorageConnectionStringPublic,
        azureStorageBlobContainerNamePublic,
        Buffer.from(uint8Array as Uint8Array),
        getAzureStorageBlobPath(storageId, fileName)
      )
    )
  );
};
