import { Readable } from 'node:stream';
import { Injectable, Logger } from '@nestjs/common';

import { forkJoin, from, fromEvent, Observable, of } from 'rxjs';
import { buffer, map, mapTo, mergeMap, switchMap } from 'rxjs/operators';

import { AzureStorageContainerType } from '@dark-rush-photography/serverless/types';
import { getAzureStorageBlockBlobClient$ } from '../functions/azure-storage-block-blob-client.functions';
import {
  createTempFile$,
  writeStreamToFile,
} from '@dark-rush-photography/serverless/util';
import {
  BlobDownloadResponseParsed,
  BlobServiceClient,
} from '@azure/storage-blob';

@Injectable()
export class AzureStorageProvider {
  uploadBufferToBlob$ = (
    connectionString: string,
    containerType: AzureStorageContainerType,
    buffer: Buffer,
    blobPath: string
  ): Observable<void> => {
    Logger.log(
      `Uploading buffer to blob path ${blobPath}`,
      AzureStorageProvider.name
    );
    return getAzureStorageBlockBlobClient$(
      connectionString,
      containerType,
      blobPath
    ).pipe(
      switchMap((blockBlobClient) => {
        return from(blockBlobClient.uploadData(buffer));
      }),
      mapTo(undefined)
    );
  };

  uploadStreamToBlob$ = (
    connectionString: string,
    containerType: AzureStorageContainerType,
    stream: Readable,
    blobPath: string
  ): Observable<void> => {
    Logger.log(
      `Uploading stream to blob path ${blobPath}`,
      AzureStorageProvider.name
    );
    return getAzureStorageBlockBlobClient$(
      connectionString,
      containerType,
      blobPath
    ).pipe(
      switchMap((blockBlobClient) => {
        return from(blockBlobClient.uploadStream(stream));
      }),
      mapTo(undefined)
    );
  };

  downloadBlobAsStream$ = (
    azureStorageConnectionString: string,
    azureStorageContainerType: AzureStorageContainerType,
    blobPath: string
  ): Observable<NodeJS.ReadableStream> => {
    Logger.log(`Downloading image blob ${blobPath}`, AzureStorageProvider.name);

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

  downloadBlobToFile$ = (
    connectionString: string,
    containerType: AzureStorageContainerType,
    blobPath: string,
    fileName: string
  ): Observable<string> =>
    forkJoin([
      this.downloadBlobAsStream$(connectionString, containerType, blobPath),
      createTempFile$(fileName),
    ]).pipe(
      mergeMap(([stream, filePath]) => writeStreamToFile(stream, filePath))
    );

  dataUriForBlob$ = (
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

  deleteBlob$ = (
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
}
