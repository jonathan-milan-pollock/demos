import * as fs from 'fs-extra';

import { Inject, Injectable, Logger } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { mapTo, switchMap, tap } from 'rxjs/operators';

import { ENV, MediaState } from '@dark-rush-photography/shared/types';
import {
  AzureStorageType,
  Env,
  Activity,
  EXIF_IMAGE_ARTIST_FN,
} from '@dark-rush-photography/serverless/types';
import { exifImageArtist } from '@dark-rush-photography/serverless/util';
import { AzureStorageProvider } from './azure-storage.provider';

@Injectable()
export class ExifImageProvider {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly azureStorageProvider: AzureStorageProvider
  ) {}

  exifImage$(activity: Activity): Observable<void> {
    Logger.log('ExifImage downloading image blob', ExifImageProvider.name);

    return this.azureStorageProvider
      .downloadBlobToFile$(
        this.env.azureStorageConnectionString,
        AzureStorageType.Private,
        this.azureStorageProvider.getBlobPath(activity.media),
        activity.media.fileName
      )
      .pipe(
        tap(() => Logger.log('ExifImage executing', ExifImageProvider.name)),
        switchMap((imageFilePath) =>
          from(exifImageArtist(imageFilePath, EXIF_IMAGE_ARTIST_FN))
        ),
        tap(() =>
          Logger.log('ExifImage uploading exifed image', ExifImageProvider.name)
        ),
        switchMap((resizedImageFilePath) =>
          this.azureStorageProvider.uploadStreamToBlob$(
            this.env.azureStorageConnectionString,
            AzureStorageType.Private,
            fs.createReadStream(resizedImageFilePath),
            this.azureStorageProvider.getBlobPath(activity.media)
          )
        ),
        mapTo(Logger.log('ExifImage complete', ExifImageProvider.name))
      );
  }
}
