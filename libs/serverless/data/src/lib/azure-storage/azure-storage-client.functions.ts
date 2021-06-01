import {
  BlobServiceClient,
  BlockBlobClient,
  ContainerClient,
} from '@azure/storage-blob';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { AzureStorageContainerType } from '@dark-rush-photography/shared-server-types';

export const getAzureStorageContainerClient$ = (
  azureStorageConnectionString: string,
  azureStorageContainerType: AzureStorageContainerType
): Observable<ContainerClient> =>
  of(BlobServiceClient.fromConnectionString(azureStorageConnectionString)).pipe(
    map((blobServiceClient) =>
      blobServiceClient.getContainerClient(azureStorageContainerType)
    )
  );

export const getAzureStorageBlockBlobClient$ = (
  azureStorageConnectionString: string,
  azureStorageContainerType: AzureStorageContainerType,
  blobPath: string
): Observable<BlockBlobClient> =>
  getAzureStorageContainerClient$(
    azureStorageConnectionString,
    azureStorageContainerType
  ).pipe(
    map((containerClient) => containerClient.getBlockBlobClient(blobPath))
  );
