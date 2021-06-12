import { Readable } from 'node:stream';

import { from, Observable } from 'rxjs';
import { map, pluck, switchMap } from 'rxjs/operators';

import { AzureStorageContainerType } from '@dark-rush-photography/shared-server/types';
import { getAzureStorageBlockBlobClient$ } from './azure-storage-block-blob-client.functions';
import { Logger } from '@nestjs/common';

export const uploadBufferToAzureStorageBlob$ = (
  buffer: Buffer,
  azureStorageConnectionString: string,
  azureStorageContainerType: AzureStorageContainerType,
  blobPath: string
): Observable<string> => {
  return getAzureStorageBlockBlobClient$(
    azureStorageConnectionString,
    azureStorageContainerType,
    blobPath
  ).pipe(
    switchMap((blockBlobClient) => from(blockBlobClient.uploadData(buffer))),
    pluck('requestId'),
    map((requestId) => requestId as string)
  );
};

export const uploadStreamToAzureStorageBlob$ = (
  stream: Readable,
  azureStorageConnectionString: string,
  azureStorageContainerType: AzureStorageContainerType,
  blobPath: string
): Observable<string> => {
  const logContext = 'uploadStreamToAzureStorageBlob$';
  Logger.log(`Uploading image blob ${blobPath}`, logContext);

  return getAzureStorageBlockBlobClient$(
    azureStorageConnectionString,
    azureStorageContainerType,
    blobPath
  ).pipe(
    switchMap((blockBlobClient) => from(blockBlobClient.uploadStream(stream))),
    pluck('requestId'),
    map((requestId) => requestId as string)
  );
};
