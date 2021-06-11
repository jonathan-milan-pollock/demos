import { Injectable, Inject, HttpService } from '@nestjs/common';

import { take } from 'rxjs/operators';

import { ENV, ImageProcessState } from '@dark-rush-photography/shared-types';
import { Env, ImageProcess } from '@dark-rush-photography/serverless/types';
import { ExifImageProcessService } from '@dark-rush-photography/serverless/data';

@Injectable()
export class ExifImageService {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly httpService: HttpService,
    private readonly exifImageProcessService: ExifImageProcessService
  ) {}

  async exifImage(imageProcess: ImageProcess): Promise<ImageProcess> {
    return this.exifImageProcessService
      .process$(this.env, this.httpService, imageProcess)
      .pipe(take(1))
      .toPromise()
      .then(() => ({
        state: ImageProcessState.Exifed,
        publishedImage: imageProcess.publishedImage,
      }));
  }
}
