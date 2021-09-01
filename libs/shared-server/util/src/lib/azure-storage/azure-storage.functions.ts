import * as fs from 'fs-extra';
import { Readable } from 'node:stream';
import { Logger } from '@nestjs/common';

import {
  buffer,
  combineLatest,
  concatMap,
  from,
  fromEvent,
  map,
  mergeMap,
  Observable,
  of,
  tap,
} from 'rxjs';
import { BlobUploadCommonResponse } from '@azure/storage-blob';

import { getAzureStorageBlockBlobClient$ } from './azure-storage-block-blob-client.functions';
import { downloadBlobAsStream$ } from './azure-storage-blob-stream.functions';
import { createTempFile$, writeStreamToFile } from '../file/file.functions';

export const uploadBufferToBlob$ = (
  connectionString: string,
  containerName: string,
  buffer: Buffer,
  blobPath: string
): Observable<BlobUploadCommonResponse> => {
  const logger = new Logger(uploadBufferToBlob$.name);
  return getAzureStorageBlockBlobClient$(
    connectionString,
    containerName,
    blobPath
  ).pipe(
    tap(() => logger.log(`Uploading buffer to ${blobPath}`)),
    concatMap((blockBlobClient) => {
      return from(blockBlobClient.uploadData(buffer));
    })
  );
};

export const uploadStreamToBlob$ = (
  connectionString: string,
  containerName: string,
  stream: Readable,
  blobPath: string
): Observable<BlobUploadCommonResponse> => {
  const logger = new Logger(uploadStreamToBlob$.name);
  return getAzureStorageBlockBlobClient$(
    connectionString,
    containerName,
    blobPath
  ).pipe(
    tap(() => logger.log(`Uploading stream to blob path ${blobPath}`)),
    concatMap((blockBlobClient) => {
      return from(blockBlobClient.uploadStream(stream));
    })
  );
};

export const downloadBlobAsBuffer$ = (
  connectionString: string,
  containerName: string,
  blobPath: string
): Observable<Buffer> => {
  const logger = new Logger(downloadBlobAsBuffer$.name);
  return downloadBlobAsStream$(connectionString, containerName, blobPath).pipe(
    tap(() => logger.log(`Downloading blob ${blobPath} as buffer`)),
    mergeMap((readableStreamBody: NodeJS.ReadableStream) =>
      fromEvent<Buffer>(readableStreamBody, 'data').pipe(
        buffer<Buffer>(fromEvent(readableStreamBody, 'end')),
        map((chunks: Buffer[]) => Buffer.concat(chunks))
      )
    )
  );
};

export const downloadBlobToFile$ = (
  connectionString: string,
  containerName: string,
  blobPath: string,
  fileName: string
): Observable<string> => {
  const logger = new Logger(downloadBlobToFile$.name);
  return downloadBlobAsStream$(connectionString, containerName, blobPath).pipe(
    tap(() => logger.log(`Downloading blob ${blobPath} to file`)),
    concatMap((stream) =>
      combineLatest([of(stream), createTempFile$(fileName)])
    ),
    concatMap(([stream, filePath]) =>
      combineLatest([
        of(filePath),
        from(writeStreamToFile(stream, fs.createWriteStream(filePath))),
      ])
    ),
    map(([filePath]) => filePath)
  );
};

export const deleteBlob$ = (
  connectionString: string,
  containerName: string,
  blobPath: string
): Observable<boolean> => {
  const logger = new Logger(deleteBlob$.name);
  return getAzureStorageBlockBlobClient$(
    connectionString,
    containerName,
    blobPath
  ).pipe(
    tap(() => logger.log(`Deleting blob ${blobPath}`)),
    concatMap((blockBlobClient) => from(blockBlobClient.deleteIfExists())),
    map((blobDeleteIfExistsResponse) => blobDeleteIfExistsResponse.succeeded)
  );
};
