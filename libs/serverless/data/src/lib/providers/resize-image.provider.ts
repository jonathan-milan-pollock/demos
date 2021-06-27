import * as fs from 'fs-extra';
import {
  BadRequestException,
  HttpService,
  Injectable,
  Logger,
} from '@nestjs/common';

import { Observable } from 'rxjs';
import { mapTo, switchMap, switchMapTo, tap } from 'rxjs/operators';

import {
  ImageDimensionType,
  PostState,
} from '@dark-rush-photography/shared-types';
import {
  AzureStorageContainerType,
  Env,
  Activity,
  IMAGE_DIMENSION_CONFIG,
  ActivityMedia,
} from '@dark-rush-photography/serverless/types';
import {
  findImageDimensionPixels$,
  getBlobPath,
  getBlobPathWithImageDimension,
  resizeImage$,
} from '@dark-rush-photography/serverless/util';
import { ApiImageDimensionProvider } from './api-image-dimension.provider';
import { AzureStorageProvider } from './azure-storage.provider';

@Injectable()
export class ResizeImageProvider {
  constructor(
    private readonly apiImageDimensionProvider: ApiImageDimensionProvider,
    private readonly azureStorageProvider: AzureStorageProvider
  ) {}
  resizeImage$(
    env: Env,
    httpService: HttpService,
    imageActivity: Activity
  ): Observable<void> {
    const { media, config } = imageActivity;

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

    return this.azureStorageProvider
      .downloadBlobToFile$(
        env.azureStorageConnectionString,
        AzureStorageContainerType.Private,
        getBlobPath(PostState.New, media),
        media.fileName
      )
      .pipe(
        tap(() =>
          Logger.log(
            `Resizing ${imageDimension.type} image`,
            ResizeImageProvider.name
          )
        ),
        switchMap((imageFilePath) =>
          resizeImage$(imageFilePath, media.fileName, imageDimension)
        ),
        switchMap((newImageFilePath) =>
          this.uploadAndRecordImageDimension$(
            env,
            httpService,
            media,
            imageDimension.type,
            newImageFilePath
          )
        )
      );
  }

  uploadAndRecordImageDimension$(
    env: Env,
    httpService: HttpService,
    media: ActivityMedia,
    imageDimensionType: ImageDimensionType,
    imageFilePath: string
  ): Observable<void> {
    return this.azureStorageProvider
      .uploadStreamToBlob$(
        env.azureStorageConnectionString,
        AzureStorageContainerType.Private,
        fs.createReadStream(imageFilePath),
        getBlobPathWithImageDimension(PostState.New, media, imageDimensionType)
      )
      .pipe(
        switchMapTo(findImageDimensionPixels$(imageFilePath)),
        switchMap((pixels) =>
          this.apiImageDimensionProvider.apiAddOrUpdateImageDimension$(
            env,
            httpService,
            media,
            imageDimensionType,
            pixels
          )
        ),
        mapTo(Logger.log('ResizeImage complete', ResizeImageProvider.name))
      );
  }
}
