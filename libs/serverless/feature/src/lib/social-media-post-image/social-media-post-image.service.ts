import { Injectable, Inject, HttpService, Logger } from '@nestjs/common';

import { take } from 'rxjs/operators';

import { ENV } from '@dark-rush-photography/shared-types';
import {
  Env,
  Activity,
  ActivityType,
} from '@dark-rush-photography/serverless/types';
import { SocialMediaPostImageProvider } from '@dark-rush-photography/serverless/data';

@Injectable()
export class SocialMediaPostImageService {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly httpService: HttpService,
    private readonly socialMediaPostImageProvider: SocialMediaPostImageProvider
  ) {}

  async socialMediaPostImage(activity: Activity): Promise<Activity> {
    Logger.log('Social Media Post image', SocialMediaPostImageService.name);
    return this.socialMediaPostImageProvider
      .socialMediaPostImage$(activity, this.env, this.httpService)
      .pipe(take(1))
      .toPromise()
      .then(() => ({
        ...activity,
        type: ActivityType.SocialMediaPost,
      }));
  }
}
