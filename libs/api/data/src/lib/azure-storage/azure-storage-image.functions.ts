import {
  BlobDownloadResponseParsed,
  BlobServiceClient,
} from '@azure/storage-blob';
import { fromEvent, Observable, of } from 'rxjs';
import { buffer, map, mergeMap, pluck, switchMap } from 'rxjs/operators';

import { AzureStorageContainerType } from '@dark-rush-photography/shared-server/types';

export const azureStorageImageNames$ = (
  azureStorageConnectionString: string,
  azureStorageContainerType: AzureStorageContainerType,
  blobPrefix: string
): Observable<string[]> => {
  return of(
    BlobServiceClient.fromConnectionString(azureStorageConnectionString)
  )
    .pipe(
      map((blobServiceClient) =>
        blobServiceClient.getContainerClient(azureStorageContainerType)
      )
    )
    .pipe(
      map((containerClient) =>
        containerClient.listBlobsFlat({
          prefix: blobPrefix,
        })
      ),
      pluck('name')
    );
};

export const dataUriForAzureBlob$ = (
  azureStorageConnectionString: string,
  azureStorageContainerType: AzureStorageContainerType,
  blobPath: string
): Observable<string> => {
  return of(
    BlobServiceClient.fromConnectionString(azureStorageConnectionString)
  ).pipe(
    map((blobServiceClient) =>
      blobServiceClient.getContainerClient(azureStorageContainerType)
    ),
    map((containerClient) => containerClient.getBlockBlobClient(blobPath)),
    switchMap((blockBlobClient) => blockBlobClient.download()),
    map((blobDownloadResponseParsed: BlobDownloadResponseParsed) => {
      if (!blobDownloadResponseParsed.readableStreamBody) {
        throw new Error('Readable stream body was undefined');
      }
      return blobDownloadResponseParsed.readableStreamBody;
    }),
    mergeMap((readableStreamBody: NodeJS.ReadableStream) =>
      fromEvent<Buffer>(readableStreamBody, 'data').pipe(
        buffer<Buffer>(fromEvent(readableStreamBody, 'end')),
        map((chunks: Buffer[]) => Buffer.concat(chunks))
      )
    ),
    map((buffer) => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const datauri = require('datauri/parser');
      const parser = new datauri();
      return parser.format('.jpg', buffer).content;
    })
  );
};
