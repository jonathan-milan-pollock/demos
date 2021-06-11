import { Injectable, Inject } from '@nestjs/common';

import { take } from 'rxjs/operators';

import { ENV, ImageProcessState } from '@dark-rush-photography/shared-types';
import { Env, ImageProcess } from '@dark-rush-photography/serverless/types';
import { TinifyImageProcessService } from '@dark-rush-photography/serverless/data';

@Injectable()
export class TinifyImageService {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly tinifyImageProcessService: TinifyImageProcessService
  ) {}

  async tinifyImage(imageProcess: ImageProcess): Promise<ImageProcess> {
    return this.tinifyImageProcessService
      .process$(this.env, imageProcess)
      .pipe(take(1))
      .toPromise()
      .then(() => ({
        state: ImageProcessState.Tinified,
        publishedImage: imageProcess.publishedImage,
      }));
  }
}
