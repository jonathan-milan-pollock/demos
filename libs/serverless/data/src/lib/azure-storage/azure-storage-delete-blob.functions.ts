import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import { AzureStorageContainerType } from '@dark-rush-photography/shared-server-types';
import { getAzureStorageBlockBlobClient$ } from './azure-storage-client.functions';

export const deleteAzureStorageBlob$ = (
  azureStorageConnectionString: string,
  azureStorageContainerType: AzureStorageContainerType,
  blobPath: string
): Observable<boolean> =>
  getAzureStorageBlockBlobClient$(
    azureStorageConnectionString,
    azureStorageContainerType,
    blobPath
  ).pipe(
    switchMap((blockBlobClient) => blockBlobClient.deleteIfExists()),
    map((blobDeleteIfExistsResponse) => blobDeleteIfExistsResponse.succeeded)
  );
