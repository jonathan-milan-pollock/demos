import { Injectable, Inject, HttpService, Logger } from '@nestjs/common';

import { ENV } from '@dark-rush-photography/shared/types';
import { Env, Activity } from '@dark-rush-photography/serverless/types';
import {
  AzureStorageProvider,
  PostEntityProvider,
} from '@dark-rush-photography/serverless/data';

@Injectable()
export class PostEntityService {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly httpService: HttpService,
    private readonly postEntityProvider: PostEntityProvider,
    private readonly azureStorageProvider: AzureStorageProvider
  ) {}

  async postEntity(activity: Activity): Promise<Activity> {
    Logger.log('Post Entity', PostEntityService.name);
    return {} as Activity;
  }
}
