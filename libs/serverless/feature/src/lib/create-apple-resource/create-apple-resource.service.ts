import { Injectable, Inject, HttpService, Logger } from '@nestjs/common';

import { ENV } from '@dark-rush-photography/shared/types';
import { Env, Activity } from '@dark-rush-photography/serverless/types';
import {
  AzureStorageProvider,
  CreateAppleResourceProvider,
} from '@dark-rush-photography/serverless/data';

@Injectable()
export class CreateAppleResourceService {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly httpService: HttpService,
    private readonly createAppleResourceProvider: CreateAppleResourceProvider,
    private readonly azureStorageProvider: AzureStorageProvider
  ) {}

  async createAppleResource(activity: Activity): Promise<Activity> {
    Logger.log('Create Apple Resource', CreateAppleResourceService.name);
    return {} as Activity;
  }
}
