// eslint-disable-next-line @typescript-eslint/no-empty-function
import * as fs from 'fs-extra';

import { HttpService, Injectable, Logger } from '@nestjs/common';
import { from, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { BestOf } from '@dark-rush-photography/shared-types';
import { AzureStorageContainerType } from '@dark-rush-photography/shared-server/types';
import {
  Env,
  ImageActivity,
  IMAGE_DIMENSION_CONFIG,
} from '@dark-rush-photography/serverless/types';

import {
  getBlobPath,
  getBlobPathWithImageDimension,
} from '@dark-rush-photography/serverless/util';

@Injectable()
export class SocialMediaPostImageActivityProvider {
  socialMediaPostImage$(
    imageActivity: ImageActivity,
    env: Env,
    httpService: HttpService
  ): Observable<void> {
    /**
     * if (imageActivity.data?.resizeImageDimensionType === undefined) {
      throw new Error(
        'resize image dimension type must be set for resizing image'
      );
    }
     */
    const logContext = 'SocialMediaPostImageActivityProvider';
    const { state, publishedImage, config } = imageActivity;

    const imageDimension = IMAGE_DIMENSION_CONFIG.find(
      (imageDimension) =>
        imageDimension.type === config?.resizeImageDimensionType
    );
    if (!imageDimension) throw new Error('Could not find image dimension');

    Logger.log('ResizeImage downloading image blob', logContext);

    return of();
  }
}
