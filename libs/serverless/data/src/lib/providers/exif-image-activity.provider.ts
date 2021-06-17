import * as fs from 'fs-extra';

import { HttpService, Injectable, Logger } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { map, mapTo, switchMap, tap } from 'rxjs/operators';

import { ImageDimensionState } from '@dark-rush-photography/shared-types';
import {
  AzureStorageContainerType,
  Env,
  ImageActivity,
  IMAGE_ARTIST_EXIF_FN,
} from '@dark-rush-photography/serverless/types';
import {
  exifImageArtist,
  getBlobPath,
} from '@dark-rush-photography/serverless/util';
import { downloadAzureStorageBlobToFile$ } from '../azure-storage/azure-storage-download.functions';
import { uploadStreamToAzureStorageBlob$ } from '../azure-storage/azure-storage-upload.functions';

@Injectable()
export class ExifImageActivityProvider {
  exifImage$(
    env: Env,
    httpService: HttpService,
    imageActivity: ImageActivity
  ): Observable<void> {
    const { state, publishedImage } = imageActivity;

    Logger.log(
      'ExifImage downloading image blob',
      ExifImageActivityProvider.name
    );

    return downloadAzureStorageBlobToFile$(
      env.azureStorageConnectionString,
      AzureStorageContainerType.Private,
      getBlobPath(state, publishedImage),
      publishedImage.imageName
    ).pipe(
      tap(() =>
        Logger.log('ExifImage executing', ExifImageActivityProvider.name)
      ),
      switchMap((imageFilePath) =>
        from(exifImageArtist(imageFilePath, IMAGE_ARTIST_EXIF_FN))
      ),
      tap(() =>
        Logger.log(
          'ExifImage uploading exifed image',
          ExifImageActivityProvider.name
        )
      ),
      switchMap((resizedImageFilePath) =>
        uploadStreamToAzureStorageBlob$(
          fs.createReadStream(resizedImageFilePath),
          env.azureStorageConnectionString,
          AzureStorageContainerType.Private,
          getBlobPath(ImageDimensionState.Exifed, publishedImage)
        )
      ),
      mapTo(Logger.log('ExifImage complete', ExifImageActivityProvider.name))
    );
  }
}
