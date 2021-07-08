import { BlockBlobClient } from '@azure/storage-blob';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AzureStorageType } from '@dark-rush-photography/shared-server/types';
import { getAzureStorageContainerClient$ } from './azure-storage-container-client.functions';

export const getAzureStorageBlockBlobClient$ = (
  connectionString: string,
  azureStorageType: AzureStorageType,
  blobPath: string
): Observable<BlockBlobClient> =>
  getAzureStorageContainerClient$(connectionString, azureStorageType).pipe(
    map((containerClient) => containerClient.getBlockBlobClient(blobPath))
  );
