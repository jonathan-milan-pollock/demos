import { BadRequestException } from '@nestjs/common';

import { BlobDownloadResponseParsed } from '@azure/storage-blob';
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { AzureStorageType } from '@dark-rush-photography/shared-server/types';
import { getAzureStorageBlockBlobClient$ } from './azure-storage-block-blob-client.functions';

export const downloadBlobAsStream$ = (
  azureStorageConnectionString: string,
  azureStorageType: AzureStorageType,
  blobPath: string
): Observable<NodeJS.ReadableStream> => {
  return getAzureStorageBlockBlobClient$(
    azureStorageConnectionString,
    azureStorageType,
    blobPath
  ).pipe(
    switchMap((blockBlobClient) => from(blockBlobClient.download())),
    map((blobDownloadResponseParsed: BlobDownloadResponseParsed) => {
      if (!blobDownloadResponseParsed.readableStreamBody) {
        throw new BadRequestException('Readable stream body was undefined');
      }
      return blobDownloadResponseParsed.readableStreamBody;
    })
  );
};
