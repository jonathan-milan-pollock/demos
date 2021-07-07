import { ContainerClient, BlobServiceClient } from '@azure/storage-blob';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { AzureStorageType } from '@dark-rush-photography/shared-server/types';

export const getAzureStorageContainerClient$ = (
  azureStorageConnectionString: string,
  azureStorageType: AzureStorageType
): Observable<ContainerClient> =>
  of(BlobServiceClient.fromConnectionString(azureStorageConnectionString)).pipe(
    map((blobServiceClient) =>
      blobServiceClient.getContainerClient(azureStorageType.toLowerCase())
    )
  );
