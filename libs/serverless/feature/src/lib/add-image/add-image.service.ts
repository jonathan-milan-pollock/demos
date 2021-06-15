import { Injectable, Inject, HttpService, Logger } from '@nestjs/common';

import { take } from 'rxjs/operators';

import { ENV, ImageDimensionState } from '@dark-rush-photography/shared-types';
import { Env, ImageActivity } from '@dark-rush-photography/serverless/types';
import { AddImageActivityProvider } from '@dark-rush-photography/serverless/data';

@Injectable()
export class AddImageService {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly httpService: HttpService,
    private readonly addImageActivityProvider: AddImageActivityProvider
  ) {}

  async addImage(imageActivity: ImageActivity): Promise<ImageActivity> {
    Logger.log('Add image', AddImageService.name);
    return this.addImageActivityProvider
      .addImage$(this.env, this.httpService, imageActivity)
      .pipe(take(1))
      .toPromise()
      .then(() => ({
        state: ImageDimensionState.Added,
        publishedImage: imageActivity.publishedImage,
      }));
  }
}
