import { Inject, Injectable, Logger } from '@nestjs/common';

import { from, Observable } from 'rxjs';
import { mapTo, switchMap, tap } from 'rxjs/operators';
import * as tinify from 'tinify';

import { ENV, PostState } from '@dark-rush-photography/shared-types';
import {
  AzureStorageContainerType,
  Env,
  Activity,
} from '@dark-rush-photography/serverless/types';
import { AzureStorageProvider } from './azure-storage.provider';

@Injectable()
export class TinifyImageProvider {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly azureStorageProvider: AzureStorageProvider
  ) {}

  tinifyImage$(activity: Activity): Observable<void> {
    const { media } = activity;

    const blobPath = this.azureStorageProvider.getBlobPath(
      PostState.New,
      media
    );
    Logger.log(`Downloading image blob ${blobPath}`, TinifyImageProvider.name);
    return this.azureStorageProvider
      .downloadBlobToFile$(
        this.env.azureStorageConnectionString,
        AzureStorageContainerType.Private,
        blobPath,
        media.fileName
      )
      .pipe(
        tap(() => Logger.log('Tinify image', TinifyImageProvider.name)),
        switchMap((imageFilePath) => {
          tinify.default.key = this.env.tinyPngApiKey;
          return from(tinify.fromFile(imageFilePath).toBuffer());
        }),
        tap(() =>
          Logger.log(
            `Uploading tinified image to blob path ${this.azureStorageProvider.getBlobPath(
              PostState.New,
              media
            )}`,
            TinifyImageProvider.name
          )
        ),
        switchMap((uint8Array) =>
          this.azureStorageProvider.uploadBufferToBlob$(
            this.env.azureStorageConnectionString,
            AzureStorageContainerType.Private,
            Buffer.from(uint8Array),
            this.azureStorageProvider.getBlobPath(PostState.New, media)
          )
        ),
        mapTo(Logger.log('TinifyImage complete', TinifyImageProvider.name))
      );
  }
}
