import { HttpService, Injectable, Logger } from '@nestjs/common';

import { from, Observable } from 'rxjs';
import { mapTo, switchMap, tap } from 'rxjs/operators';
import * as tinify from 'tinify';

import {
  AzureStorageContainerType,
  Env,
  Activity,
} from '@dark-rush-photography/serverless/types';
import { getBlobPath } from '@dark-rush-photography/serverless/util';
import { AzureStorageProvider } from './azure-storage.provider';
import { PostState } from '@dark-rush-photography/shared-types';

@Injectable()
export class TinifyImageProvider {
  constructor(private readonly azureStorageProvider: AzureStorageProvider) {}
  tinifyImage$(
    env: Env,
    httpService: HttpService,
    imageActivity: Activity
  ): Observable<void> {
    const { media } = imageActivity;

    const blobPath = getBlobPath(PostState.New, media);
    Logger.log(`Downloading image blob ${blobPath}`, TinifyImageProvider.name);
    return this.azureStorageProvider
      .downloadBlobToFile$(
        env.azureStorageConnectionString,
        AzureStorageContainerType.Private,
        blobPath,
        media.fileName
      )
      .pipe(
        tap(() => Logger.log('Tinifying image', TinifyImageProvider.name)),
        switchMap((imageFilePath) => {
          tinify.default.key = env.tinyPngApiKey;
          return from(tinify.fromFile(imageFilePath).toBuffer());
        }),
        tap(() =>
          Logger.log(
            `Uploading tinified image to blob path ${getBlobPath(
              PostState.New,
              media
            )}`,
            TinifyImageProvider.name
          )
        ),
        switchMap((uint8Array) =>
          this.azureStorageProvider.uploadBufferToBlob$(
            env.azureStorageConnectionString,
            AzureStorageContainerType.Private,
            Buffer.from(uint8Array),
            getBlobPath(PostState.New, media)
          )
        ),
        mapTo(Logger.log('TinifyImage complete', TinifyImageProvider.name))
      );
  }
}
