import { Injectable, Inject } from '@nestjs/common';

import { take } from 'rxjs/operators';

import { ENV } from '@dark-rush-photography/shared-types';
import { Env, ImageProcess } from '@dark-rush-photography/serverless/types';

import { tinifyImage$ } from '@dark-rush-photography/serverless/data';

@Injectable()
export class TinifyImageService {
  constructor(@Inject(ENV) private readonly env: Env) {}

  async tinifyImage(imageProcess: ImageProcess): Promise<ImageProcess> {
    return tinifyImage$(imageProcess, this.env)
      .pipe(take(1))
      .toPromise()
      .then(() => ({
        type: 'tinified-image',
        publishedImage: imageProcess.publishedImage,
      }));
  }
}
