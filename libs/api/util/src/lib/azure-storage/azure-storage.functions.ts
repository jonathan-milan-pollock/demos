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
} from 'rxjs';
import { BlobServiceClient } from '@azure/storage-blob';

import { createTempFile$, writeStreamToFile } from '../file/file.functions';
import { downloadBlobAsStream$ } from './azure-storage-blob-stream.functions';

export const uploadBufferToBlob$ = (
  connectionString: string,
  containerName: string,
  buffer: Buffer,
  blobPath: string
): Observable<void> => {
  const logger = new Logger(uploadBufferToBlob$.name);
  logger.log(`Uploading buffer to ${blobPath}`);

  const blobServiceClient =
    BlobServiceClient.fromConnectionString(connectionString);
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blockBlobClient = containerClient.getBlockBlobClient(blobPath);
  return from(blockBlobClient.uploadData(buffer)).pipe(map(() => undefined));
};

export const uploadStreamToBlob$ = (
  connectionString: string,
  containerName: string,
  stream: Readable,
  blobPath: string
): Observable<void> => {
  const logger = new Logger(uploadStreamToBlob$.name);
  logger.log(`Uploading stream to blob path ${blobPath}`);

  const blobServiceClient =
    BlobServiceClient.fromConnectionString(connectionString);
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blockBlobClient = containerClient.getBlockBlobClient(blobPath);
  return from(blockBlobClient.uploadStream(stream)).pipe(map(() => undefined));
};

export const downloadBlobAsBuffer$ = (
  connectionString: string,
  containerName: string,
  blobPath: string
): Observable<Buffer> => {
  const logger = new Logger(downloadBlobAsBuffer$.name);
  logger.log(`Downloading blob ${blobPath} as buffer`);

  const blobServiceClient =
    BlobServiceClient.fromConnectionString(connectionString);
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blockBlobClient = containerClient.getBlockBlobClient(blobPath);

  return downloadBlobAsStream$(blockBlobClient).pipe(
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
  logger.log(`Downloading blob ${blobPath} to file`);

  const blobServiceClient =
    BlobServiceClient.fromConnectionString(connectionString);
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blockBlobClient = containerClient.getBlockBlobClient(blobPath);

  return downloadBlobAsStream$(blockBlobClient).pipe(
    concatMap((stream) =>
      combineLatest([of(stream), createTempFile$(fileName)])
    ),
    concatMap(([stream, filePath]) =>
      from(writeStreamToFile(stream, fs.createWriteStream(filePath))).pipe(
        map(() => filePath)
      )
    )
  );
};

export const deleteAzureStorageBlockBlobIfExists$ = (
  connectionString: string,
  containerName: string,
  blobPath: string
): Observable<void> => {
  const logger = new Logger(deleteAzureStorageBlockBlobIfExists$.name);
  logger.log(`Deleting blob ${blobPath}`);

  const blobServiceClient =
    BlobServiceClient.fromConnectionString(connectionString);
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blockBlobClient = containerClient.getBlockBlobClient(blobPath);
  return from(blockBlobClient.deleteIfExists()).pipe(map(() => undefined));
};
