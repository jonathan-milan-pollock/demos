import { Injectable, Inject, HttpService, Logger } from '@nestjs/common';

import { ENV } from '@dark-rush-photography/shared-types';
import { Env, Activity } from '@dark-rush-photography/serverless/types';
import {
  AzureStorageProvider,
  CreateIconProvider,
} from '@dark-rush-photography/serverless/data';

@Injectable()
export class CreateIconService {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly httpService: HttpService,
    private readonly createIconProvider: CreateIconProvider,
    private readonly azureStorageProvider: AzureStorageProvider
  ) {}

  async createIcon(activity: Activity): Promise<Activity> {
    Logger.log('Create Icon', CreateIconService.name);
    return {} as Activity;
  }
}
