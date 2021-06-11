import * as fs from 'fs-extra';

import { HttpService, Injectable, Logger } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { ImageProcessState } from '@dark-rush-photography/shared-types';
import { AzureStorageContainerType } from '@dark-rush-photography/shared-server-types';
import {
  Env,
  ImageProcess,
  IMAGE_DIMENSIONS,
} from '@dark-rush-photography/serverless/types';
import {
  formatMessage,
  getBlobPath,
  getBlobPathWithImageDimension,
  resizeImage,
} from '@dark-rush-photography/serverless/util';
import { downloadAzureStorageBlobToFile$ } from '../azure-storage/azure-storage-download.functions';
import { uploadStreamToAzureStorageBlob$ } from '../azure-storage/azure-storage-upload.functions';

@Injectable()
export class ResizeImageProcessService {
  process$(
    env: Env,
    httpService: HttpService,
    imageProcess: ImageProcess
  ): Observable<void> {
    /**
     * if (imageProcess.data?.resizeType === undefined) {
      throw new Error(
        'resize image dimension type must be set for resizing image'
      );
    }
     */

    const { state, publishedImage, data: imageProcessData } = imageProcess;

    const imageDimension = IMAGE_DIMENSIONS.find(
      (imageDimension) => imageDimension.type === imageProcessData?.resizeType
    );
    if (!imageDimension) throw new Error('Could not find image dimension');

    Logger.log(formatMessage('ResizeImage starting'));
    Logger.log(formatMessage('ResizeImage downloading image blob'));

    return downloadAzureStorageBlobToFile$(
      env.azureStorageConnectionString,
      AzureStorageContainerType.Private,
      getBlobPath(state, publishedImage),
      publishedImage.imageName
    ).pipe(
      tap(() => Logger.log(formatMessage('ResizeImage executing'))),
      switchMap((imageFilePath) =>
        from(
          resizeImage(imageFilePath, publishedImage.imageName, imageDimension)
        )
      ),
      tap(() =>
        Logger.log(formatMessage('ResizeImage uploading resized image'))
      ),
      switchMap((resizedImageFilePath) =>
        uploadStreamToAzureStorageBlob$(
          fs.createReadStream(resizedImageFilePath),
          env.azureStorageConnectionString,
          AzureStorageContainerType.Private,
          getBlobPathWithImageDimension(
            ImageProcessState.Resized,
            publishedImage,
            imageDimension.type
          )
        )
      ),
      map(() => Logger.log(formatMessage('ResizeImage complete')))
    );
  }
}
