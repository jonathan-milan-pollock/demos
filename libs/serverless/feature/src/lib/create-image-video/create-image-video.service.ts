import { Injectable, Inject, HttpService, Logger } from '@nestjs/common';

import { ENV } from '@dark-rush-photography/shared-types';
import { Env, Activity } from '@dark-rush-photography/serverless/types';
import {
  AzureStorageProvider,
  CreateImageVideoProvider,
} from '@dark-rush-photography/serverless/data';

@Injectable()
export class CreateImageVideoService {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly httpService: HttpService,
    private readonly createImageVideoProvider: CreateImageVideoProvider,
    private readonly azureStorageProvider: AzureStorageProvider
  ) {}

  async createImageVideo(activity: Activity): Promise<Activity> {
    Logger.log('Create Image Video', CreateImageVideoService.name);
    return {} as Activity;
  }
}
