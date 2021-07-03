import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Observable, of } from 'rxjs';

import { ENV } from '@dark-rush-photography/shared/types';
import {
  Env,
  Activity,
  IMAGE_DIMENSION_CONFIG,
} from '@dark-rush-photography/serverless/types';
import { AzureStorageProvider } from './azure-storage.provider';

@Injectable()
export class SocialMediaPostImageProvider {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly azureStorageProvider: AzureStorageProvider
  ) {}

  socialMediaPostImage$(activity: Activity): Observable<void> {
    /**
     * if (activity.data?.resizeImageDimensionType == undefined) {
      throw new BadRequestException(
        'resize image dimension type must be set for resizing image'
      );
    }
     */
    const { media, config } = activity;

    const imageDimension = IMAGE_DIMENSION_CONFIG.find(
      (imageDimension) => imageDimension.type == config?.imageDimensionType
    );
    if (!imageDimension)
      throw new NotFoundException('Could not find image dimension');

    Logger.log(
      'ResizeImage downloading image blob',
      SocialMediaPostImageProvider.name
    );

    return of();
  }
}
