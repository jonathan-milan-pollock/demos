import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import { AzureStorageContainerType } from '@dark-rush-photography/serverless/types';
import { getAzureStorageBlockBlobClient$ } from './azure-storage-block-blob-client.functions';

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
