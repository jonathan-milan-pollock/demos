import { Injectable, Inject, HttpService, Logger } from '@nestjs/common';

import { ENV } from '@dark-rush-photography/shared/types';
import { Env, Activity } from '@dark-rush-photography/serverless/types';
import {
  AzureStorageProvider,
  DeleteEntityProvider,
} from '@dark-rush-photography/serverless/data';

@Injectable()
export class DeleteEntityService {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly httpService: HttpService,
    private readonly deleteEntityProvider: DeleteEntityProvider,
    private readonly azureStorageProvider: AzureStorageProvider
  ) {}

  async deleteEntity(activity: Activity): Promise<Activity> {
    Logger.log('Delete Entity', DeleteEntityService.name);
    return {} as Activity;
  }
}
