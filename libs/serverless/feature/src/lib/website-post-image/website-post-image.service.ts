import { Injectable, Inject, HttpService } from '@nestjs/common';

import { take } from 'rxjs/operators';

import { ENV, ImageDimensionState } from '@dark-rush-photography/shared-types';
import { Env, ImageActivity } from '@dark-rush-photography/serverless/types';

import { WebsitePostImageActivityProvider } from '@dark-rush-photography/serverless/data';

@Injectable()
export class WebsitePostImageService {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly httpService: HttpService,
    private readonly websitePostImageActivityProvider: WebsitePostImageActivityProvider
  ) {}

  async websitePostImage(imageActivity: ImageActivity): Promise<ImageActivity> {
    return this.websitePostImageActivityProvider
      .process$(this.env, this.httpService, imageActivity)
      .pipe(take(1))
      .toPromise()
      .then(() => ({
        state: ImageDimensionState.WebsitePosted,
        publishedImage: imageActivity.publishedImage,
      }));
  }
}
