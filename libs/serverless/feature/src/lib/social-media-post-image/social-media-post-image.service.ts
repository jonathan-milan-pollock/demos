import { Injectable, Inject, HttpService, Logger } from '@nestjs/common';

import { take } from 'rxjs/operators';

import { ENV } from '@dark-rush-photography/shared/types';
import { Env, Activity } from '@dark-rush-photography/serverless/types';
import {
  AzureStorageProvider,
  SocialMediaPostImageProvider,
} from '@dark-rush-photography/serverless/data';

@Injectable()
export class SocialMediaPostImageService {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly httpService: HttpService,
    private readonly socialMediaPostImageProvider: SocialMediaPostImageProvider,
    private readonly azureStorageProvider: AzureStorageProvider
  ) {}

  async socialMediaPostImage(activity: Activity): Promise<Activity> {
    Logger.log('Social Media Post Image', SocialMediaPostImageService.name);
    return this.socialMediaPostImageProvider
      .socialMediaPostImage$(activity)
      .pipe(take(1))
      .toPromise()
      .then(() => activity);
  }
}
