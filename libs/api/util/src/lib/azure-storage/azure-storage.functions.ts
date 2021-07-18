import { Logger } from '@nestjs/common';

import { BlobUploadCommonResponse } from '@azure/storage-blob';
import { Readable } from 'node:stream';
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
  switchMap,
} from 'rxjs';

import {
  ImageDimensionType,
  VideoDimensionType,
} from '@dark-rush-photography/shared/types';
import { Media } from '@dark-rush-photography/api/types';
import { createTempFile$, writeStreamToFile$ } from '../file/file.functions';
import { getAzureStorageBlockBlobClient$ } from './azure-storage-block-blob-client.functions';
import { getAzureStorageBlobPrefix } from './azure-storage-blob-path.functions';
import { downloadBlobAsStream$ } from './azure-storage-blob-stream.functions';

export const getBlobPath = (media: Media): string => {
  const blobPrefix = getAzureStorageBlobPrefix(media);
  return `${blobPrefix}/${media.fileName}`;
};

export const getBlobPathWithDimension = (
  media: Media,
  mediaDimensionType: ImageDimensionType | VideoDimensionType
): string => {
  const blobPrefix = getAzureStorageBlobPrefix(media);
  return `${blobPrefix}/${mediaDimensionType.toLowerCase()}/${media.fileName}`;
};

export const uploadBufferToBlob$ = (
  connectionString: string,
  buffer: Buffer,
  blobPath: string
): Observable<BlobUploadCommonResponse> => {
  Logger.log(
    `Uploading buffer to blob path ${blobPath}`,
    uploadBufferToBlob$.name
  );
  return getAzureStorageBlockBlobClient$(connectionString, blobPath).pipe(
    switchMap((blockBlobClient) => {
      return from(blockBlobClient.uploadData(buffer));
    })
  );
};

export const uploadStreamToBlob$ = (
  connectionString: string,
  stream: Readable,
  blobPath: string
): Observable<BlobUploadCommonResponse> => {
  Logger.log(
    `Uploading stream to blob path ${blobPath}`,
    uploadStreamToBlob$.name
  );
  return getAzureStorageBlockBlobClient$(connectionString, blobPath).pipe(
    switchMap((blockBlobClient) => {
      return from(blockBlobClient.uploadStream(stream));
    })
  );
};

export const downloadBlobAsBuffer$ = (
  connectionString: string,
  blobPath: string
): Observable<Buffer> => {
  Logger.log(
    `Downloading blob ${blobPath} as buffer`,
    downloadBlobAsBuffer$.name
  );
  return downloadBlobAsStream$(connectionString, blobPath).pipe(
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
  blobPath: string,
  fileName: string
): Observable<string> => {
  Logger.log(`Downloading blob ${blobPath} to file`, downloadBlobToFile$.name);
  return downloadBlobAsStream$(connectionString, blobPath).pipe(
    concatMap((stream) =>
      combineLatest([of(stream), createTempFile$(fileName)])
    ),
    concatMap(([stream, filePath]) =>
      from(writeStreamToFile$(stream, filePath))
    )
  );
};

export const deleteBlob$ = (
  connectionString: string,
  blobPath: string
): Observable<boolean> => {
  Logger.log(`Deleting blob ${blobPath}`, deleteBlob$.name);
  return getAzureStorageBlockBlobClient$(connectionString, blobPath).pipe(
    switchMap((blockBlobClient) => from(blockBlobClient.deleteIfExists())),
    map((blobDeleteIfExistsResponse) => blobDeleteIfExistsResponse.succeeded)
  );
};
