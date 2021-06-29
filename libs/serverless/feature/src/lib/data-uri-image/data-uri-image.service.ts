import { Injectable, Inject, HttpService, Logger } from '@nestjs/common';

import { ENV } from '@dark-rush-photography/shared-types';
import { Env, Activity } from '@dark-rush-photography/serverless/types';
import {
  AzureStorageProvider,
  DataUriImageProvider,
} from '@dark-rush-photography/serverless/data';

@Injectable()
export class DataUriImageService {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly httpService: HttpService,
    private readonly dataUriImageProvider: DataUriImageProvider,
    private readonly azureStorageProvider: AzureStorageProvider
  ) {}

  async dataUriImage(activity: Activity): Promise<Activity> {
    Logger.log('Data Uri Image', DataUriImageService.name);
    return {} as Activity;
  }
}
