import { BlobServiceClient, BlockBlobClient } from '@azure/storage-blob';

import { map, Observable, of } from 'rxjs';

import { IMAGES } from '@dark-rush-photography/shared-server/types';

export const getAzureStorageBlockBlobClient$ = (
  connectionString: string,
  blobPath: string
): Observable<BlockBlobClient> =>
  of(BlobServiceClient.fromConnectionString(connectionString)).pipe(
    map((blobServiceClient) => blobServiceClient.getContainerClient(IMAGES)),
    map((containerClient) => containerClient.getBlockBlobClient(blobPath))
  );
