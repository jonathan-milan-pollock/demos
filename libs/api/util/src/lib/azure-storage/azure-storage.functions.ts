import * as fs from 'fs-extra';
import { Readable } from 'node:stream';
import { ConflictException, Logger } from '@nestjs/common';

import { combineLatest, concatMap, from, map, Observable, of } from 'rxjs';
import {
  BlobDownloadResponseParsed,
  BlobServiceClient,
} from '@azure/storage-blob';

import { createTempFile$, writeStreamToFile } from '../file/file.functions';

export const uploadAzureStorageStreamToBlob$ = (
  stream: Readable,
  mimeType: string,
  blobPath: string,
  connectionString: string,
  containerName: string
): Observable<void> => {
  const logger = new Logger(uploadAzureStorageStreamToBlob$.name);
  logger.log(`Uploading stream to blob path ${blobPath}`);

  const blobServiceClient =
    BlobServiceClient.fromConnectionString(connectionString);
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blockBlobClient = containerClient.getBlockBlobClient(blobPath);
  return from(
    blockBlobClient.uploadStream(stream, undefined, undefined, {
      blobHTTPHeaders: { blobContentType: mimeType },
    })
  ).pipe(map(() => undefined));
};

export const downloadAzureStorageBlobToFile$ = (
  blobPath: string,
  fileName: string,
  connectionString: string,
  containerName: string
): Observable<string> => {
  const logger = new Logger(downloadAzureStorageBlobToFile$.name);
  logger.log(`Downloading blob ${blobPath} to file`);

  const blobServiceClient =
    BlobServiceClient.fromConnectionString(connectionString);
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blockBlobClient = containerClient.getBlockBlobClient(blobPath);

  return from(blockBlobClient.download()).pipe(
    map((response: BlobDownloadResponseParsed) => {
      if (!response.readableStreamBody) {
        throw new ConflictException('Readable stream body was undefined');
      }
      return response.readableStreamBody;
    }),
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

//TODO: Remove when ready
/*const deleteAllBlobs = async (
  containerClient: ContainerClient
): Promise<void> => {
  for await (const blob of containerClient.listBlobsFlat()) {
    console.log(blob.name);
    const blockBlobClient = containerClient.getBlockBlobClient(blob.name);
    await blockBlobClient.deleteIfExists();
  }
};
*/

export const deleteAzureStorageBlobIfExists$ = (
  blobPath: string,
  connectionString: string,
  containerName: string
): Observable<void> => {
  const blobServiceClient =
    BlobServiceClient.fromConnectionString(connectionString);
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blockBlobClient = containerClient.getBlockBlobClient(blobPath);
  return from(blockBlobClient.deleteIfExists()).pipe(
    //    concatMap(() => from(deleteAllBlobs(containerClient))),
    map(() => undefined)
  );
};
