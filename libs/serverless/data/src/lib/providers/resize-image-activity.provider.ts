import * as fs from 'fs-extra';
import {
  BadRequestException,
  HttpService,
  Injectable,
  Logger,
} from '@nestjs/common';

import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import {
  ImageDimensionState,
  ImageDimensionType,
} from '@dark-rush-photography/shared-types';
import { AzureStorageContainerType } from '@dark-rush-photography/shared-server/types';
import {
  Env,
  ImageActivity,
  IMAGE_DIMENSION_CONFIG,
  PublishedImage,
} from '@dark-rush-photography/serverless/types';
import {
  downloadAzureStorageBlobToFile$,
  uploadStreamToAzureStorageBlob$,
} from '@dark-rush-photography/shared-server/util';
import {
  findImageDimensionPixels$,
  getBlobPath,
  getBlobPathWithImageDimension,
  resizeImage$,
} from '@dark-rush-photography/serverless/util';
import { apiAddOrUpdateImageDimension$ } from '../api-gateway/image-dimension-api-gateway.functions';

@Injectable()
export class ResizeImageActivityProvider {
  readonly logContext = 'ResizeImageActivityProvider';

  resizeImage$(
    env: Env,
    httpService: HttpService,
    imageActivity: ImageActivity
  ): Observable<void> {
    const { state, publishedImage, config } = imageActivity;

    if (!config?.resizeImageDimensionType) {
      throw new BadRequestException(
        'Resize image dimension type must be provided'
      );
    }

    const imageDimension = IMAGE_DIMENSION_CONFIG.find(
      (imageDimension) =>
        imageDimension.type === config?.resizeImageDimensionType
    );
    if (!imageDimension)
      throw new BadRequestException('Could not find image dimension');

    return downloadAzureStorageBlobToFile$(
      env.azureStorageConnectionString,
      AzureStorageContainerType.Private,
      getBlobPath(state, publishedImage),
      publishedImage.imageName
    ).pipe(
      tap(() =>
        Logger.log(`Resizing ${imageDimension.type} image`, this.logContext)
      ),
      switchMap((imageFilePath) =>
        resizeImage$(imageFilePath, publishedImage.imageName, imageDimension)
      ),
      switchMap((newImageFilePath) =>
        this.uploadAndRecordImageDimension$(
          env,
          httpService,
          publishedImage,
          imageDimension.type,
          newImageFilePath
        )
      )
    );
  }

  uploadAndRecordImageDimension$(
    env: Env,
    httpService: HttpService,
    publishedImage: PublishedImage,
    imageDimensionType: ImageDimensionType,
    imageFilePath: string
  ): Observable<void> {
    Logger.log(
      'imageFilePath' + imageFilePath,
      'uploadAndRecordImageDimension$'
    );
    return uploadStreamToAzureStorageBlob$(
      fs.createReadStream(imageFilePath),
      env.azureStorageConnectionString,
      AzureStorageContainerType.Private,
      getBlobPathWithImageDimension(
        ImageDimensionState.Resized,
        publishedImage,
        imageDimensionType
      )
    ).pipe(
      switchMap(() => findImageDimensionPixels$(imageFilePath)),
      switchMap((imageDimensionPixels) =>
        apiAddOrUpdateImageDimension$(
          env,
          httpService,
          publishedImage,
          imageDimensionType,
          ImageDimensionState.Resized,
          imageDimensionPixels
        )
      ),
      map(() => Logger.log('ResizeImage complete', this.logContext))
    );
  }
}
