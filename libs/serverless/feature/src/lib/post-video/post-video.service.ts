import { Injectable, Inject, HttpService, Logger } from '@nestjs/common';

import { ENV } from '@dark-rush-photography/shared-types';
import { Env, Activity } from '@dark-rush-photography/serverless/types';
import {
  AzureStorageProvider,
  CreateIconProvider,
  PostVideoProvider,
} from '@dark-rush-photography/serverless/data';

@Injectable()
export class PostVideoService {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly httpService: HttpService,
    private readonly postVideoProvider: PostVideoProvider,
    private readonly azureStorageProvider: AzureStorageProvider
  ) {}

  async postVideo(activity: Activity): Promise<Activity> {
    Logger.log('Post Video', PostVideoService.name);
    return {} as Activity;
  }
}
