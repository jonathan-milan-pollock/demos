import { Readable } from 'node:stream';
import { Logger } from '@nestjs/common';

import { from, Observable } from 'rxjs';
import { mapTo, switchMap } from 'rxjs/operators';

import { AzureStorageContainerType } from '@dark-rush-photography/serverless/types';
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
  Logger.log(
    `Uploading image blob ${blobPath}`,
    uploadStreamToAzureStorageBlob$.name
  );

  return getAzureStorageBlockBlobClient$(
    azureStorageConnectionString,
    azureStorageContainerType,
    blobPath
  ).pipe(
    switchMap((blockBlobClient) => from(blockBlobClient.uploadStream(stream))),
    mapTo(undefined)
  );
};
