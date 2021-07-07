import { Readable } from 'node:stream';
import { Injectable, Logger } from '@nestjs/common';

import { BlobUploadCommonResponse } from '@azure/storage-blob';
import { forkJoin, from, fromEvent, Observable } from 'rxjs';
import { buffer, map, mergeMap, switchMap } from 'rxjs/operators';

import {
  ImageDimensionType,
  Media,
  MediaState,
  VideoDimensionType,
} from '@dark-rush-photography/shared/types';
import { AzureStorageType } from '@dark-rush-photography/shared-server/types';
import {
  createTempFile$,
  downloadBlobAsStream$,
  getAzureStorageBlobPrefix,
  getAzureStorageBlockBlobClient$,
  getAzureStorageTypeFromMediaState,
  writeStreamToFile$,
} from '@dark-rush-photography/shared-server/util';

@Injectable()
export class AzureStorageProvider {
  getBlobPath = (media: Media): string => {
    const blobPrefix = getAzureStorageBlobPrefix(media);
    return `${blobPrefix}/${media.fileName}`;
  };

  getBlobPathWithDimension = (
    media: Media,
    mediaDimensionType: ImageDimensionType | VideoDimensionType
  ): string => {
    const blobPrefix = getAzureStorageBlobPrefix(media);
    return `${blobPrefix}/${mediaDimensionType.toLowerCase()}/${
      media.fileName
    }`;
  };

  getAzureStorageType(mediaState: MediaState): AzureStorageType {
    return getAzureStorageTypeFromMediaState(mediaState);
  }

  uploadBufferToBlob$ = (
    connectionString: string,
    containerType: AzureStorageType,
    buffer: Buffer,
    blobPath: string
  ): Observable<BlobUploadCommonResponse> => {
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
      })
    );
  };

  uploadStreamToBlob$ = (
    connectionString: string,
    containerType: AzureStorageType,
    stream: Readable,
    blobPath: string
  ): Observable<BlobUploadCommonResponse> => {
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
      })
    );
  };

  downloadBlobAsBuffer$ = (
    azureStorageConnectionString: string,
    azureStorageType: AzureStorageType,
    blobPath: string
  ): Observable<Buffer> => {
    Logger.log(
      `Downloading blob ${blobPath} as buffer`,
      AzureStorageProvider.name
    );
    return downloadBlobAsStream$(
      azureStorageConnectionString,
      azureStorageType,
      blobPath
    ).pipe(
      mergeMap((readableStreamBody: NodeJS.ReadableStream) =>
        fromEvent<Buffer>(readableStreamBody, 'data').pipe(
          buffer<Buffer>(fromEvent(readableStreamBody, 'end')),
          map((chunks: Buffer[]) => Buffer.concat(chunks))
        )
      )
    );
  };

  downloadBlobToFile$ = (
    connectionString: string,
    containerType: AzureStorageType,
    blobPath: string,
    fileName: string
  ): Observable<string> => {
    Logger.log(
      `Downloading blob ${blobPath} to file`,
      AzureStorageProvider.name
    );
    return forkJoin([
      downloadBlobAsStream$(connectionString, containerType, blobPath),
      createTempFile$(fileName),
    ]).pipe(
      mergeMap(([stream, filePath]) => writeStreamToFile$(stream, filePath))
    );
  };

  deleteBlob$ = (
    azureStorageConnectionString: string,
    azureStorageType: AzureStorageType,
    blobPath: string
  ): Observable<boolean> => {
    Logger.log(`Deleting blob ${blobPath}`, AzureStorageProvider.name);
    return getAzureStorageBlockBlobClient$(
      azureStorageConnectionString,
      azureStorageType,
      blobPath
    ).pipe(
      switchMap((blockBlobClient) => from(blockBlobClient.deleteIfExists())),
      map((blobDeleteIfExistsResponse) => blobDeleteIfExistsResponse.succeeded)
    );
  };
}
