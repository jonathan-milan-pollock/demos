import { BlobServiceClient, BlockBlobClient } from '@azure/storage-blob';

import { map, Observable, of } from 'rxjs';

export const getAzureStorageBlockBlobClient$ = (
  connectionString: string,
  containerName: string,
  blobPath: string
): Observable<BlockBlobClient> =>
  of(BlobServiceClient.fromConnectionString(connectionString)).pipe(
    map((blobServiceClient) =>
      blobServiceClient.getContainerClient(containerName)
    ),
    map((containerClient) => containerClient.getBlockBlobClient(blobPath))
  );
