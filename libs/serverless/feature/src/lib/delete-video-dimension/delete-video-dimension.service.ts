import { Injectable, Inject, HttpService, Logger } from '@nestjs/common';

import { ENV } from '@dark-rush-photography/shared-types';
import { Env, Activity } from '@dark-rush-photography/serverless/types';
import {
  AzureStorageProvider,
  CreateIconProvider,
  DeleteVideoDimensionProvider,
} from '@dark-rush-photography/serverless/data';

@Injectable()
export class DeleteVideoDimensionService {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly httpService: HttpService,
    private readonly deleteVideoDimensionProvider: DeleteVideoDimensionProvider,
    private readonly azureStorageProvider: AzureStorageProvider
  ) {}

  async deleteVideoDimension(activity: Activity): Promise<Activity> {
    Logger.log('Delete Video Dimension', DeleteVideoDimensionService.name);
    return {} as Activity;
  }
}
