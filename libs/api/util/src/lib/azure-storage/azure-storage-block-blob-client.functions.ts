import { BlobServiceClient, BlockBlobClient } from '@azure/storage-blob';

import { map, Observable, of } from 'rxjs';

import { BLOBS } from '@dark-rush-photography/api/types';

export const getAzureStorageBlockBlobClient$ = (
  connectionString: string,
  blobPath: string
): Observable<BlockBlobClient> =>
  of(BlobServiceClient.fromConnectionString(connectionString)).pipe(
    map((blobServiceClient) => blobServiceClient.getContainerClient(BLOBS)),
    map((containerClient) => containerClient.getBlockBlobClient(blobPath))
  );
