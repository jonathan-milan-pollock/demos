import { Injectable, Inject, HttpService, Logger } from '@nestjs/common';

import { ENV } from '@dark-rush-photography/shared-types';
import { Env, Activity } from '@dark-rush-photography/serverless/types';
import {
  AzureStorageProvider,
  UpdateVideoProvider,
} from '@dark-rush-photography/serverless/data';

@Injectable()
export class UpdateVideoService {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly httpService: HttpService,
    private readonly updateVideoProvider: UpdateVideoProvider,
    private readonly azureStorageProvider: AzureStorageProvider
  ) {}

  async updateVideo(activity: Activity): Promise<Activity> {
    Logger.log('Update Video', UpdateVideoService.name);
    return {} as Activity;
  }
}
