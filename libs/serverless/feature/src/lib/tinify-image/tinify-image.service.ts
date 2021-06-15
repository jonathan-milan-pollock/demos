import { Injectable, Inject, HttpService, Logger } from '@nestjs/common';

import { take } from 'rxjs/operators';

import { ENV, ImageDimensionState } from '@dark-rush-photography/shared-types';
import { Env, ImageActivity } from '@dark-rush-photography/serverless/types';
import { TinifyImageActivityProvider } from '@dark-rush-photography/serverless/data';

@Injectable()
export class TinifyImageService {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly httpService: HttpService,
    private readonly tinifyImageActivityProvider: TinifyImageActivityProvider
  ) {}

  async tinifyImage(imageActivity: ImageActivity): Promise<ImageActivity> {
    Logger.log('Tinify image', TinifyImageService.name);
    return this.tinifyImageActivityProvider
      .tinifyImage$(this.env, this.httpService, imageActivity)
      .pipe(take(1))
      .toPromise()
      .then(() => ({
        state: ImageDimensionState.Tinified,
        publishedImage: imageActivity.publishedImage,
      }));
  }
}
