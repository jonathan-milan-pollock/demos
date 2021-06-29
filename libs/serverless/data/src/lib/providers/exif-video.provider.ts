import * as fs from 'fs-extra';

import { Inject, Injectable, Logger } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { mapTo, switchMap, tap } from 'rxjs/operators';

import { ENV, PostState } from '@dark-rush-photography/shared-types';
import {
  AzureStorageContainerType,
  Env,
  Activity,
  EXIF_IMAGE_ARTIST_FN,
} from '@dark-rush-photography/serverless/types';
import { exifImageArtist } from '@dark-rush-photography/serverless/util';
import { AzureStorageProvider } from './azure-storage.provider';

@Injectable()
export class ExifVideoProvider {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly azureStorageProvider: AzureStorageProvider
  ) {}

  exifVideo$(activity: Activity): Observable<void> {
    Logger.log('ExifImage downloading image blob', ExifVideoProvider.name);

    return this.azureStorageProvider
      .downloadBlobToFile$(
        this.env.azureStorageConnectionString,
        AzureStorageContainerType.Private,
        this.azureStorageProvider.getBlobPath(
          activity.postState,
          activity.media
        ),
        activity.media.fileName
      )
      .pipe(
        tap(() => Logger.log('ExifImage executing', ExifVideoProvider.name)),
        switchMap((imageFilePath) =>
          from(exifImageArtist(imageFilePath, EXIF_IMAGE_ARTIST_FN))
        ),
        tap(() =>
          Logger.log('ExifImage uploading exifed image', ExifVideoProvider.name)
        ),
        switchMap((resizedImageFilePath) =>
          this.azureStorageProvider.uploadStreamToBlob$(
            this.env.azureStorageConnectionString,
            AzureStorageContainerType.Private,
            fs.createReadStream(resizedImageFilePath),
            this.azureStorageProvider.getBlobPath(PostState.New, activity.media)
          )
        ),
        mapTo(Logger.log('Exif Video complete', ExifVideoProvider.name))
      );
  }
}
