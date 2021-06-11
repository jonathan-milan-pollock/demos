import { forkJoin, Observable } from 'rxjs';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { BlobDownloadResponseParsed } from '@azure/storage-blob';

import { AzureStorageContainerType } from '@dark-rush-photography/shared-server-types';
import { getAzureStorageBlockBlobClient$ } from './azure-storage-client.functions';
import {
  createTempFile,
  writeStreamToFile,
} from '@dark-rush-photography/serverless/util';

export const downloadAzureStorageBlobAsStream$ = (
  azureStorageConnectionString: string,
  azureStorageContainerType: AzureStorageContainerType,
  blobPath: string
): Observable<NodeJS.ReadableStream> =>
  getAzureStorageBlockBlobClient$(
    azureStorageConnectionString,
    azureStorageContainerType,
    blobPath
  ).pipe(
    switchMap((blockBlobClient) => blockBlobClient.download()),
    map((blobDownloadResponseParsed: BlobDownloadResponseParsed) => {
      if (!blobDownloadResponseParsed.readableStreamBody) {
        throw new Error('Readable stream body was undefined');
      }
      return blobDownloadResponseParsed.readableStreamBody;
    })
  );

export const downloadAzureStorageBlobToFile$ = (
  azureStorageConnectionString: string,
  azureStorageContainerType: AzureStorageContainerType,
  blobPath: string,
  fileName: string
): Observable<string> =>
  forkJoin([
    downloadAzureStorageBlobAsStream$(
      azureStorageConnectionString,
      azureStorageContainerType,
      blobPath
    ),
    createTempFile(fileName),
  ]).pipe(
    mergeMap(([stream, filePath]) => writeStreamToFile(stream, filePath))
  );
