import { Injectable, Inject, HttpService } from '@nestjs/common';

import { take } from 'rxjs/operators';

import { ENV, ImageProcessState } from '@dark-rush-photography/shared-types';
import { Env, ImageProcess } from '@dark-rush-photography/serverless/types';
import { SocialMediaPostImageProcessService } from '@dark-rush-photography/serverless/data';

@Injectable()
export class SocialMediaPostImageService {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly httpService: HttpService,
    private readonly socialMediaPostImageProcessService: SocialMediaPostImageProcessService
  ) {}

  async socialMediaPostImage(
    imageProcess: ImageProcess
  ): Promise<ImageProcess> {
    return this.socialMediaPostImageProcessService
      .process$(imageProcess, this.env, this.httpService)
      .pipe(take(1))
      .toPromise()
      .then(() => ({
        state: ImageProcessState.SocialMediaPosted,
        publishedImage: imageProcess.publishedImage,
      }));
  }
}
