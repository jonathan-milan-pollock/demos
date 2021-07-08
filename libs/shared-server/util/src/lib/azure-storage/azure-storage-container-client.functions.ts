import { ContainerClient, BlobServiceClient } from '@azure/storage-blob';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { AzureStorageType } from '@dark-rush-photography/shared-server/types';

export const getAzureStorageContainerClient$ = (
  connectionString: string,
  azureStorageType: AzureStorageType
): Observable<ContainerClient> =>
  of(BlobServiceClient.fromConnectionString(connectionString)).pipe(
    map((blobServiceClient) =>
      blobServiceClient.getContainerClient(azureStorageType.toLowerCase())
    )
  );
