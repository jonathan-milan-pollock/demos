import * as fs from 'fs-extra';
import {
  BadRequestException,
  HttpService,
  Injectable,
  Logger,
} from '@nestjs/common';

import { from, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { ImageDimensionState } from '@dark-rush-photography/shared-types';
import { AzureStorageContainerType } from '@dark-rush-photography/shared-server-types';
import {
  Env,
  ImageActivity,
  IMAGE_DIMENSIONS,
} from '@dark-rush-photography/serverless/types';
import {
  getBlobPath,
  getBlobPathWithImageDimension,
  resizeImage,
} from '@dark-rush-photography/serverless/util';
import { downloadAzureStorageBlobToFile$ } from '../azure-storage/azure-storage-download.functions';
import { uploadStreamToAzureStorageBlob$ } from '../azure-storage/azure-storage-upload.functions';

@Injectable()
export class ResizeImageActivityProvider {
  process$(
    env: Env,
    httpService: HttpService,
    imageActivity: ImageActivity
  ): Observable<void> {
    const logContext = 'ResizeImageActivityProvider';
    const { state, publishedImage, config } = imageActivity;

    if (!config?.resizeImageDimensionType) {
      throw new BadRequestException(
        'Resize image dimension type must be provided'
      );
    }

    const imageDimension = IMAGE_DIMENSIONS.find(
      (imageDimension) =>
        imageDimension.type === config?.resizeImageDimensionType
    );
    if (!imageDimension)
      throw new BadRequestException('Could not find image dimension');

    Logger.log('Downloading image blob', logContext);
    return downloadAzureStorageBlobToFile$(
      env.azureStorageConnectionString,
      AzureStorageContainerType.Private,
      getBlobPath(state, publishedImage),
      publishedImage.imageName
    ).pipe(
      tap(() =>
        Logger.log(`Resizing for ${imageDimension.type} image`, logContext)
      ),
      switchMap((imageFilePath) =>
        from(
          resizeImage(imageFilePath, publishedImage.imageName, imageDimension)
        )
      ),
      tap(() => Logger.log('Uploading resized image', logContext)),
      switchMap((resizedImageFilePath) =>
        uploadStreamToAzureStorageBlob$(
          fs.createReadStream(resizedImageFilePath),
          env.azureStorageConnectionString,
          AzureStorageContainerType.Private,
          getBlobPathWithImageDimension(
            ImageDimensionState.Resized,
            publishedImage,
            imageDimension.type
          )
        )
      ),
      map(() => Logger.log('ResizeImage complete', logContext))
    );
  }
}
