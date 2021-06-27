import * as fs from 'fs-extra';

import { HttpService, Injectable, Logger } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { mapTo, switchMap, tap } from 'rxjs/operators';

import { PostState } from '@dark-rush-photography/shared-types';
import {
  AzureStorageContainerType,
  Env,
  Activity,
  IMAGE_ARTIST_EXIF_FN,
} from '@dark-rush-photography/serverless/types';
import {
  exifImageArtist,
  getBlobPath,
} from '@dark-rush-photography/serverless/util';
import { AzureStorageProvider } from './azure-storage.provider';

@Injectable()
export class ExifImageProvider {
  constructor(private readonly azureStorageProvider: AzureStorageProvider) {}
  exifImage$(
    env: Env,
    httpService: HttpService,
    imageActivity: Activity
  ): Observable<void> {
    const { media } = imageActivity;

    Logger.log('ExifImage downloading image blob', ExifImageProvider.name);

    return this.azureStorageProvider
      .downloadBlobToFile$(
        env.azureStorageConnectionString,
        AzureStorageContainerType.Private,
        getBlobPath(PostState.New, media),
        media.fileName
      )
      .pipe(
        tap(() => Logger.log('ExifImage executing', ExifImageProvider.name)),
        switchMap((imageFilePath) =>
          from(exifImageArtist(imageFilePath, IMAGE_ARTIST_EXIF_FN))
        ),
        tap(() =>
          Logger.log('ExifImage uploading exifed image', ExifImageProvider.name)
        ),
        switchMap((resizedImageFilePath) =>
          this.azureStorageProvider.uploadStreamToBlob$(
            env.azureStorageConnectionString,
            AzureStorageContainerType.Private,
            fs.createReadStream(resizedImageFilePath),
            getBlobPath(PostState.New, media)
          )
        ),
        mapTo(Logger.log('ExifImage complete', ExifImageProvider.name))
      );
  }
}
