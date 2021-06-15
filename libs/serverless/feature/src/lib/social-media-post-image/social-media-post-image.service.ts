import { Injectable, Inject, HttpService, Logger } from '@nestjs/common';

import { take } from 'rxjs/operators';

import { ENV, ImageDimensionState } from '@dark-rush-photography/shared-types';
import { Env, ImageActivity } from '@dark-rush-photography/serverless/types';
import { SocialMediaPostImageActivityProvider } from '@dark-rush-photography/serverless/data';

@Injectable()
export class SocialMediaPostImageService {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly httpService: HttpService,
    private readonly socialMediaPostImageActivityProvider: SocialMediaPostImageActivityProvider
  ) {}

  async socialMediaPostImage(
    imageActivity: ImageActivity
  ): Promise<ImageActivity> {
    Logger.log('Social Media Post image', SocialMediaPostImageService.name);
    return this.socialMediaPostImageActivityProvider
      .socialMediaPostImage$(imageActivity, this.env, this.httpService)
      .pipe(take(1))
      .toPromise()
      .then(() => ({
        state: ImageDimensionState.SocialMediaPosted,
        publishedImage: imageActivity.publishedImage,
      }));
  }
}
