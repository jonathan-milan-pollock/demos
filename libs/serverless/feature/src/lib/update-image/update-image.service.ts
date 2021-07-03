import { Injectable, Inject, HttpService, Logger } from '@nestjs/common';

import { ENV } from '@dark-rush-photography/shared/types';
import { Env, Activity } from '@dark-rush-photography/serverless/types';
import {
  AzureStorageProvider,
  UpdateImageProvider,
} from '@dark-rush-photography/serverless/data';

@Injectable()
export class UpdateImageService {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly httpService: HttpService,
    private readonly updateImageProvider: UpdateImageProvider,
    private readonly azureStorageProvider: AzureStorageProvider
  ) {}

  async updateImage(activity: Activity): Promise<Activity> {
    Logger.log('Update Image', UpdateImageService.name);
    return {} as Activity;
  }
}
