import { Readable } from 'node:stream';
import { Logger } from '@nestjs/common';

import { from, Observable } from 'rxjs';
import { mapTo, switchMap } from 'rxjs/operators';

import { AzureStorageContainerType } from '@dark-rush-photography/shared-server/types';
import { getAzureStorageBlockBlobClient$ } from './azure-storage-block-blob-client.functions';

export const uploadBufferToAzureStorageBlob$ = (
  buffer: Buffer,
  azureStorageConnectionString: string,
  azureStorageContainerType: AzureStorageContainerType,
  blobPath: string
): Observable<void> => {
  return getAzureStorageBlockBlobClient$(
    azureStorageConnectionString,
    azureStorageContainerType,
    blobPath
  ).pipe(
    switchMap((blockBlobClient) => from(blockBlobClient.uploadData(buffer))),
    mapTo(undefined)
  );
};

export const uploadStreamToAzureStorageBlob$ = (
  stream: Readable,
  azureStorageConnectionString: string,
  azureStorageContainerType: AzureStorageContainerType,
  blobPath: string
): Observable<void> => {
  const logContext = 'uploadStreamToAzureStorageBlob$';
  Logger.log(`Uploading image blob ${blobPath}`, logContext);

  return getAzureStorageBlockBlobClient$(
    azureStorageConnectionString,
    azureStorageContainerType,
    blobPath
  ).pipe(
    switchMap((blockBlobClient) => from(blockBlobClient.uploadStream(stream))),
    mapTo(undefined)
  );
};
