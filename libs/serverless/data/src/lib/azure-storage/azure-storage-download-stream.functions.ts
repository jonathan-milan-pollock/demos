import { BlobDownloadResponseParsed } from '@azure/storage-blob';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import { AzureStorageContainerType } from '@dark-rush-photography/serverless/types';
import { getAzureStorageBlockBlobClient$ } from './azure-storage-block-blob-client.functions';
import { Logger } from '@nestjs/common';

export const downloadAzureStorageBlobAsStream$ = (
  azureStorageConnectionString: string,
  azureStorageContainerType: AzureStorageContainerType,
  blobPath: string
): Observable<NodeJS.ReadableStream> => {
  Logger.log(
    `Downloading image blob ${blobPath}`,
    downloadAzureStorageBlobAsStream$.name
  );

  return getAzureStorageBlockBlobClient$(
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
};
