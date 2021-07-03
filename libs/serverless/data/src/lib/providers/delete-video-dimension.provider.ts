import * as fs from 'fs-extra';
import {
  BadRequestException,
  HttpService,
  Inject,
  Injectable,
} from '@nestjs/common';

import { Observable } from 'rxjs';
import { mapTo, switchMap, switchMapTo } from 'rxjs/operators';

import { ENV, ImageDimensionType } from '@dark-rush-photography/shared/types';
import {
  AzureStorageType,
  Env,
  Activity,
  IMAGE_DIMENSION_CONFIG,
  ActivityConfig,
  ImageDimensionConfig,
} from '@dark-rush-photography/serverless/types';
import {
  addImageDimension$,
  findImageDimensionPixels$,
  resizeImage$,
} from '@dark-rush-photography/serverless/util';
import { AzureStorageProvider } from './azure-storage.provider';

@Injectable()
export class DeleteVideoDimensionProvider {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly azureStorageProvider: AzureStorageProvider
  ) {}

  validateActivityConfig(config?: ActivityConfig): ActivityConfig {
    if (!config?.imageDimensionType) {
      throw new BadRequestException('Image dimension type must be provided');
    }
    return config;
  }

  findImageDimensionConfig(config: ActivityConfig): ImageDimensionConfig {
    const imageDimensionConfig = IMAGE_DIMENSION_CONFIG.find(
      (imageDimension) => imageDimension.type == config.imageDimensionType
    );
    if (!imageDimensionConfig)
      throw new BadRequestException('Could not find image dimension config');

    return imageDimensionConfig;
  }

  resizeImage$(
    fileName: string,
    filePath: string,
    imageDimensionConfig: ImageDimensionConfig
  ): Observable<string> {
    return resizeImage$(filePath, fileName, imageDimensionConfig);
  }

  addImageDimension$(
    env: Env,
    httpService: HttpService,
    activity: Activity,
    imageDimensionType: ImageDimensionType,
    imageFilePath: string
  ): Observable<void> {
    return this.azureStorageProvider
      .uploadStreamToBlob$(
        env.azureStorageConnectionString,
        AzureStorageType.Private,
        fs.createReadStream(imageFilePath),
        this.azureStorageProvider.getBlobPathWithImageDimension(
          activity.media,
          imageDimensionType
        )
      )
      .pipe(
        switchMapTo(findImageDimensionPixels$(imageFilePath)),
        switchMap((pixels) =>
          addImageDimension$(
            env,
            httpService,
            activity.media,
            imageDimensionType,
            pixels
          )
        ),
        mapTo(undefined)
      );
  }
}
