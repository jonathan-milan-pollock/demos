import { Injectable, Inject, HttpService } from '@nestjs/common';

import { take } from 'rxjs/operators';

import { ENV, ImageProcessState } from '@dark-rush-photography/shared-types';
import { Env, ImageProcess } from '@dark-rush-photography/serverless/types';

import { WebsitePostImageProcessService } from '@dark-rush-photography/serverless/data';

@Injectable()
export class WebsitePostImageService {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly httpService: HttpService,
    private readonly websitePostImageProcessService: WebsitePostImageProcessService
  ) {}

  async websitePostImage(imageProcess: ImageProcess): Promise<ImageProcess> {
    return this.websitePostImageProcessService
      .process$(this.env, this.httpService, imageProcess)
      .pipe(take(1))
      .toPromise()
      .then(() => ({
        state: ImageProcessState.WebsitePosted,
        publishedImage: imageProcess.publishedImage,
      }));
  }
}
