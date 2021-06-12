import {
  BlobServiceClient,
  BlockBlobClient,
  ContainerClient,
} from '@azure/storage-blob';

import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Logger } from '@nestjs/common';

import { AzureStorageContainerType } from '@dark-rush-photography/shared-server-types';
import { getAzureStorageContainerClient$ } from './azure-storage-container-client.functions';

const logContext = 'getAzureStorageBlockBlobClient$';
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
      Logger.log(`Getting blob client for blob path ${blobPath}`, logContext)
    ),
    map((containerClient) => containerClient.getBlockBlobClient(blobPath))
  );
