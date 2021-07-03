import { Injectable, Inject, HttpService, Logger } from '@nestjs/common';

import { ENV } from '@dark-rush-photography/shared/types';
import { Env, Activity } from '@dark-rush-photography/serverless/types';
import {
  AzureStorageProvider,
  UpdateVideoDimensionProvider,
} from '@dark-rush-photography/serverless/data';

@Injectable()
export class UpdateVideoDimensionService {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly httpService: HttpService,
    private readonly updateVideoDimensionProvider: UpdateVideoDimensionProvider,
    private readonly azureStorageProvider: AzureStorageProvider
  ) {}

  async updateVideoDimension(activity: Activity): Promise<Activity> {
    Logger.log('Update Video Dimension', UpdateVideoDimensionService.name);
    return {} as Activity;
  }
}
