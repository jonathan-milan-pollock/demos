import { BlockBlobClient } from '@azure/storage-blob';

import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Logger } from '@nestjs/common';

import { AzureStorageContainerType } from '@dark-rush-photography/serverless/types';
import { getAzureStorageContainerClient$ } from './azure-storage-container-client.functions';

export const getAzureStorageBlockBlobClient$ = (
  azureStorageConnectionString: string,
  azureStorageContainerType: AzureStorageContainerType,
  blobPath: string
): Observable<BlockBlobClient> =>
  getAzureStorageContainerClient$(
    azureStorageConnectionString,
    azureStorageContainerType
  ).pipe(
    tap(() =>
      Logger.log(
        `Getting blob client for blob path ${blobPath}`,
        getAzureStorageBlockBlobClient$.name
      )
    ),
    map((containerClient) => containerClient.getBlockBlobClient(blobPath))
  );
