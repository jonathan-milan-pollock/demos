import { Injectable, Inject, HttpService, Logger } from '@nestjs/common';

import { ENV } from '@dark-rush-photography/shared-types';
import { Env, Activity } from '@dark-rush-photography/serverless/types';
import {
  AzureStorageProvider,
  UpdateEntityProvider,
} from '@dark-rush-photography/serverless/data';

@Injectable()
export class UpdateEntityService {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly httpService: HttpService,
    private readonly updateEntityProvider: UpdateEntityProvider,
    private readonly azureStorageProvider: AzureStorageProvider
  ) {}

  async updateEntity(activity: Activity): Promise<Activity> {
    Logger.log('Update Entity', UpdateEntityService.name);
    return {} as Activity;
  }
}
