import * as fs from 'fs-extra';

import { HttpService, Injectable, Logger } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { AzureStorageContainerType } from '@dark-rush-photography/shared-server-types';
import {
  Env,
  ImageActivity,
  IMAGE_ARTIST_EXIF_FN,
} from '@dark-rush-photography/serverless/types';
import { downloadAzureStorageBlobToFile$ } from '../azure-storage/azure-storage-download.functions';
import { uploadStreamToAzureStorageBlob$ } from '../azure-storage/azure-storage-upload.functions';
import {
  exifImageArtist,
  getBlobPath,
} from '@dark-rush-photography/serverless/util';
import { ImageDimensionState } from '@dark-rush-photography/shared-types';

@Injectable()
export class ExifImageActivityProvider {
  process$(
    env: Env,
    httpService: HttpService,
    imageActivity: ImageActivity
  ): Observable<void> {
    const logContext = 'ExifImageActivityProvider';
    const { state, publishedImage } = imageActivity;

    Logger.log('ExifImage downloading image blob', logContext);

    return downloadAzureStorageBlobToFile$(
      env.azureStorageConnectionString,
      AzureStorageContainerType.Private,
      getBlobPath(state, publishedImage),
      publishedImage.imageName
    ).pipe(
      tap(() => Logger.log('ExifImage executing', logContext)),
      switchMap((imageFilePath) =>
        from(exifImageArtist(imageFilePath, IMAGE_ARTIST_EXIF_FN))
      ),
      tap(() => Logger.log('ExifImage uploading exifed image', logContext)),
      switchMap((resizedImageFilePath) =>
        uploadStreamToAzureStorageBlob$(
          fs.createReadStream(resizedImageFilePath),
          env.azureStorageConnectionString,
          AzureStorageContainerType.Private,
          getBlobPath(ImageDimensionState.Exifed, publishedImage)
        )
      ),
      map(() => Logger.log('ExifImage complete', logContext))
    );
  }
}
