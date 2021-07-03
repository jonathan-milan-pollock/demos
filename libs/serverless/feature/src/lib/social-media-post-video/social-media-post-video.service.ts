import { Injectable, Inject, HttpService, Logger } from '@nestjs/common';

import { take } from 'rxjs/operators';

import { ENV } from '@dark-rush-photography/shared/types';
import { Env, Activity } from '@dark-rush-photography/serverless/types';
import {
  AzureStorageProvider,
  SocialMediaPostVideoProvider,
} from '@dark-rush-photography/serverless/data';

@Injectable()
export class SocialMediaPostVideoService {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly httpService: HttpService,
    private readonly socialMediaPostVideoProvider: SocialMediaPostVideoProvider,
    private readonly azureStorageProvider: AzureStorageProvider
  ) {}

  async socialMediaPostVideo(activity: Activity): Promise<Activity> {
    Logger.log('Social Media Post Video', SocialMediaPostVideoService.name);
    return this.socialMediaPostVideoProvider
      .socialMediaPostVideo$(activity)
      .pipe(take(1))
      .toPromise()
      .then(() => activity);
  }
}
