import { Injectable, Inject, HttpService, Logger } from '@nestjs/common';

import { take } from 'rxjs/operators';

import { ENV } from '@dark-rush-photography/shared-types';
import {
  Env,
  Activity,
  ActivityType,
} from '@dark-rush-photography/serverless/types';

import { WebsitePostImageProvider } from '@dark-rush-photography/serverless/data';

@Injectable()
export class WebsitePostImageService {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly httpService: HttpService,
    private readonly websitePostImageProvider: WebsitePostImageProvider
  ) {}

  async websitePostImage(activity: Activity): Promise<Activity> {
    Logger.log('Website Post image', WebsitePostImageService.name);
    return this.websitePostImageProvider
      .websitePostImage$(this.env, this.httpService, activity)
      .pipe(take(1))
      .toPromise()
      .then(() => ({
        ...activity,
        type: ActivityType.WebsitePost,
      }));
  }
}
