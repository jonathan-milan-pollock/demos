import { Injectable, Inject } from '@nestjs/common';

import { take } from 'rxjs/operators';

import { ENV } from '@dark-rush-photography/shared-types';
import { Env, ImageProcess } from '@dark-rush-photography/serverless/types';

import { resizeImage$ } from '@dark-rush-photography/serverless/data';

@Injectable()
export class ResizeImageService {
  constructor(@Inject(ENV) private readonly env: Env) {}

  async resizeImage(imageProcess: ImageProcess): Promise<ImageProcess> {
    return resizeImage$(imageProcess, this.env)
      .pipe(take(1))
      .toPromise()
      .then(() => ({
        type: 'resized-image',
        publishedImage: imageProcess.publishedImage,
      }));
  }
}
