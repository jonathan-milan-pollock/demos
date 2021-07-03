import {
  BadRequestException,
  HttpService,
  Inject,
  Injectable,
} from '@nestjs/common';

import { Observable } from 'rxjs';
import { mapTo, switchMap, switchMapTo } from 'rxjs/operators';

import {
  ENV,
  ImageDimensionType,
  MediaDimensionPixels,
} from '@dark-rush-photography/shared/types';
import {
  AzureStorageType,
  Env,
  Activity,
  IMAGE_DIMENSION_CONFIG,
  ActivityConfig,
  ImageDimensionConfig,
  ActivityMedia,
} from '@dark-rush-photography/serverless/types';
import {
  addImageDimension$,
  findImageDimensionPixels$,
  resizeImage$,
} from '@dark-rush-photography/serverless/util';
import { AzureStorageProvider } from './azure-storage.provider';

@Injectable()
export class DimensionImageProvider {
  constructor(private readonly azureStorageProvider: AzureStorageProvider) {}

  getImageDimensionConfig(config: ActivityConfig): ImageDimensionConfig {
    if (!config?.imageDimensionType) {
      throw new BadRequestException('Image dimension type must be provided');
    }
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
    return resizeImage$(fileName, filePath, imageDimensionConfig);
  }

  findImageDimensionPixels$(
    filePath: string
  ): Observable<MediaDimensionPixels> {
    return findImageDimensionPixels$(filePath);
  }
}
