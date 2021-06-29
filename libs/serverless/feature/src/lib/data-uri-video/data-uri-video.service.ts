import { Injectable, Inject, HttpService, Logger } from '@nestjs/common';

import { ENV } from '@dark-rush-photography/shared-types';
import { Env, Activity } from '@dark-rush-photography/serverless/types';
import {
  AzureStorageProvider,
  DataUriVideoProvider,
} from '@dark-rush-photography/serverless/data';

@Injectable()
export class DataUriVideoService {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly httpService: HttpService,
    private readonly dataUriVideoProvider: DataUriVideoProvider,
    private readonly azureStorageProvider: AzureStorageProvider
  ) {}

  async dataUriVideo(activity: Activity): Promise<Activity> {
    Logger.log('Data Uri Video', DataUriVideoService.name);
    return {} as Activity;
  }
}
