// eslint-disable-next-line @typescript-eslint/no-empty-function
import * as fs from 'fs-extra';

import { HttpService, Injectable, Logger } from '@nestjs/common';
import { from, Observable, of } from 'rxjs';

import {
  Env,
  Activity,
  IMAGE_DIMENSION_CONFIG,
} from '@dark-rush-photography/serverless/types';

@Injectable()
export class WebsitePostImageProvider {
  websitePostImage$(
    env: Env,
    httpService: HttpService,
    imageActivity: Activity
  ): Observable<void> {
    /**
     * if (config?.resizeImageDimensionType === undefined) {
      throw new Error(
        'resize image dimension type must be set for resizing image'
      );
    }
     */

    const { config } = imageActivity;

    const imageDimension = IMAGE_DIMENSION_CONFIG.find(
      (imageDimension) =>
        imageDimension.type === config?.resizeImageDimensionType
    );
    if (!imageDimension) throw new Error('Could not find image dimension');

    Logger.log('ResizeImage downloading image blob');

    return of();
  }
}
