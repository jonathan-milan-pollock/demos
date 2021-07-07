import { Readable } from 'node:stream';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';

import { BlobDownloadResponseParsed } from '@azure/storage-blob';
import { forkJoin, from, fromEvent, Observable } from 'rxjs';
import { buffer, map, mapTo, mergeMap, switchMap } from 'rxjs/operators';

import { Media, MediaState } from '@dark-rush-photography/shared/types';
import { AzureStorageType } from '@dark-rush-photography/shared-server/types';
import {
  createTempFile$,
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
    mediaDimensionType: string
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
    containerType: AzureStorageType,
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
    azureStorageType: AzureStorageType,
    blobPath: string
  ): Observable<NodeJS.ReadableStream> => {
    Logger.log(`Downloading image blob ${blobPath}`, AzureStorageProvider.name);

    return getAzureStorageBlockBlobClient$(
      azureStorageConnectionString,
      azureStorageType,
      blobPath
    ).pipe(
      switchMap((blockBlobClient) => blockBlobClient.download()),
      map((blobDownloadResponseParsed: BlobDownloadResponseParsed) => {
        if (!blobDownloadResponseParsed.readableStreamBody) {
          throw new BadRequestException('Readable stream body was undefined');
        }
        return blobDownloadResponseParsed.readableStreamBody;
      })
    );
  };

  downloadBlobAsBuffer$ = (
    azureStorageConnectionString: string,
    azureStorageType: AzureStorageType,
    blobPath: string
  ): Observable<Buffer> => {
    Logger.log(`Downloading image blob ${blobPath}`, AzureStorageProvider.name);

    return this.downloadBlobAsStream$(
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
  ): Observable<string> =>
    forkJoin([
      this.downloadBlobAsStream$(connectionString, containerType, blobPath),
      createTempFile$(fileName),
    ]).pipe(
      mergeMap(([stream, filePath]) => writeStreamToFile$(stream, filePath))
    );

  deleteBlob$ = (
    azureStorageConnectionString: string,
    azureStorageType: AzureStorageType,
    blobPath: string
  ): Observable<boolean> =>
    getAzureStorageBlockBlobClient$(
      azureStorageConnectionString,
      azureStorageType,
      blobPath
    ).pipe(
      switchMap((blockBlobClient) => blockBlobClient.deleteIfExists()),
      map((blobDeleteIfExistsResponse) => blobDeleteIfExistsResponse.succeeded)
    );
}
