import { Injectable, Inject, HttpService } from '@nestjs/common';

import { take } from 'rxjs/operators';

import { ENV, ImageDimensionState } from '@dark-rush-photography/shared-types';
import { Env, ImageActivity } from '@dark-rush-photography/serverless/types';
import { ExifImageActivityProvider } from '@dark-rush-photography/serverless/data';

@Injectable()
export class ExifImageService {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly httpService: HttpService,
    private readonly exifImageActivityProvider: ExifImageActivityProvider
  ) {}

  async exifImage(imageActivity: ImageActivity): Promise<ImageActivity> {
    return this.exifImageActivityProvider
      .process$(this.env, this.httpService, imageActivity)
      .pipe(take(1))
      .toPromise()
      .then(() => ({
        state: ImageDimensionState.Exifed,
        publishedImage: imageActivity.publishedImage,
      }));
  }
}
