import { Injectable, Inject, HttpService, Logger } from '@nestjs/common';

import { take } from 'rxjs/operators';

import { ENV, ImageDimensionState } from '@dark-rush-photography/shared-types';
import { Env, ImageActivity } from '@dark-rush-photography/serverless/types';
import { ResizeImageActivityProvider } from '@dark-rush-photography/serverless/data';

@Injectable()
export class ResizeImageService {
  readonly logContext = 'ResizeImageService';

  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly httpService: HttpService,
    private readonly resizeImageActivityProvider: ResizeImageActivityProvider
  ) {}

  async resizeImage(imageActivity: ImageActivity): Promise<ImageActivity> {
    Logger.log('Resizing image', this.logContext);
    return this.resizeImageActivityProvider
      .resizeImage$(this.env, this.httpService, imageActivity)
      .pipe(take(1))
      .toPromise()
      .then(() => ({
        state: ImageDimensionState.Resized,
        publishedImage: imageActivity.publishedImage,
      }));
  }
}
