import { Readable } from 'node:stream';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';

import { forkJoin, from, fromEvent, Observable, of } from 'rxjs';
import { buffer, map, mapTo, mergeMap, switchMap } from 'rxjs/operators';

import {
  ActivityMedia,
  AzureStorageContainerType,
} from '@dark-rush-photography/serverless/types';
import {
  createTempFile$,
  getAzureStorageBlockBlobClient$,
  getBlobPrefix,
  writeStreamToFile,
} from '@dark-rush-photography/serverless/util';
import {
  BlobDownloadResponseParsed,
  BlobServiceClient,
} from '@azure/storage-blob';
import {
  ImageDimensionType,
  PostState,
} from '@dark-rush-photography/shared-types';

@Injectable()
export class AzureStorageProvider {
  getBlobPath = (
    postState: PostState,
    activityMedia: ActivityMedia
  ): string => {
    const blobPrefix = getBlobPrefix(postState, activityMedia);
    return `${blobPrefix}/${activityMedia.fileName}`;
  };

  getBlobPathWithImageDimension = (
    postState: PostState,
    activityMedia: ActivityMedia,
    imageDimensionType: ImageDimensionType
  ): string => {
    const blobPrefix = getBlobPrefix(postState, activityMedia);
    return `${blobPrefix}/${imageDimensionType.toLowerCase()}/${
      activityMedia.fileName
    }`;
  };

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
          throw new BadRequestException('Readable stream body was undefined');
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
          throw new BadRequestException('Readable stream body was undefined');
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
