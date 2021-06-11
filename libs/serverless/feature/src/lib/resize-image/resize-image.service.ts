import { Injectable, Inject, HttpService } from '@nestjs/common';

import { take } from 'rxjs/operators';

import { ENV, ImageProcessState } from '@dark-rush-photography/shared-types';
import { Env, ImageProcess } from '@dark-rush-photography/serverless/types';
import { ResizeImageProcessService } from '@dark-rush-photography/serverless/data';

@Injectable()
export class ResizeImageService {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly httpService: HttpService,
    private readonly resizeImageProcessService: ResizeImageProcessService
  ) {}

  async resizeImage(imageProcess: ImageProcess): Promise<ImageProcess> {
    return this.resizeImageProcessService
      .process$(this.env, this.httpService, imageProcess)
      .pipe(take(1))
      .toPromise()
      .then(() => ({
        state: ImageProcessState.Resized,
        publishedImage: imageProcess.publishedImage,
      }));
  }
}
