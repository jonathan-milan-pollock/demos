import { BadRequestException } from '@nestjs/common';

import { BlobDownloadResponseParsed } from '@azure/storage-blob';
import { concatMap, from, map, Observable } from 'rxjs';

import { getAzureStorageBlockBlobClient$ } from './azure-storage-block-blob-client.functions';

export const downloadBlobAsStream$ = (
  connectionString: string,
  blobPath: string
): Observable<NodeJS.ReadableStream> => {
  return getAzureStorageBlockBlobClient$(connectionString, blobPath).pipe(
    concatMap((blockBlobClient) => from(blockBlobClient.download())),
    map((blobDownloadResponseParsed: BlobDownloadResponseParsed) => {
      if (!blobDownloadResponseParsed.readableStreamBody) {
        throw new BadRequestException('Readable stream body was undefined');
      }
      return blobDownloadResponseParsed.readableStreamBody;
    })
  );
};
