import { Injectable, Inject, HttpService, Logger } from '@nestjs/common';

import { ENV } from '@dark-rush-photography/shared-types';
import { Env, Activity } from '@dark-rush-photography/serverless/types';
import {
  AzureStorageProvider,
  DeleteVideoProvider,
} from '@dark-rush-photography/serverless/data';

@Injectable()
export class DeleteVideoService {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly httpService: HttpService,
    private readonly deleteVideoProvider: DeleteVideoProvider,
    private readonly azureStorageProvider: AzureStorageProvider
  ) {}

  async deleteVideo(activity: Activity): Promise<Activity> {
    Logger.log('Delete Video', DeleteVideoService.name);
    return {} as Activity;
  }
}
