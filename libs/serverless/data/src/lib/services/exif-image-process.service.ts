import * as fs from 'fs-extra';

import { HttpService, Injectable, Logger } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { AzureStorageContainerType } from '@dark-rush-photography/shared-server-types';
import {
  Env,
  ImageProcess,
  IMAGE_ARTIST_EXIF_FN,
} from '@dark-rush-photography/serverless/types';
import { downloadAzureStorageBlobToFile$ } from '../azure-storage/azure-storage-download.functions';
import { uploadStreamToAzureStorageBlob$ } from '../azure-storage/azure-storage-upload.functions';
import {
  exifImageArtist,
  formatMessage,
  getBlobPath,
} from '@dark-rush-photography/serverless/util';
import { ImageProcessState } from '@dark-rush-photography/shared-types';

@Injectable()
export class ExifImageProcessService {
  process$(
    env: Env,
    httpService: HttpService,
    imageProcess: ImageProcess
  ): Observable<void> {
    const { state, publishedImage } = imageProcess;

    Logger.log(formatMessage('ExifImage starting'));
    Logger.log(formatMessage('ExifImage downloading image blob'));

    return downloadAzureStorageBlobToFile$(
      env.azureStorageConnectionString,
      AzureStorageContainerType.Private,
      getBlobPath(state, publishedImage),
      publishedImage.imageName
    ).pipe(
      tap(() => Logger.log(formatMessage('ExifImage executing'))),
      switchMap((imageFilePath) =>
        from(exifImageArtist(imageFilePath, IMAGE_ARTIST_EXIF_FN))
      ),
      tap(() => Logger.log(formatMessage('ExifImage uploading exifed image'))),
      switchMap((resizedImageFilePath) =>
        uploadStreamToAzureStorageBlob$(
          fs.createReadStream(resizedImageFilePath),
          env.azureStorageConnectionString,
          AzureStorageContainerType.Private,
          getBlobPath(ImageProcessState.Exifed, publishedImage)
        )
      ),
      map(() => Logger.log(formatMessage('ExifImage complete')))
    );
  }
}
