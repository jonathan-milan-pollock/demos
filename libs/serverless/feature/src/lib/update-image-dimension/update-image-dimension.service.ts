import { Injectable, Inject, HttpService, Logger } from '@nestjs/common';

import { ENV } from '@dark-rush-photography/shared/types';
import { Env, Activity } from '@dark-rush-photography/serverless/types';
import {
  AzureStorageProvider,
  UpdateImageDimensionProvider,
} from '@dark-rush-photography/serverless/data';

@Injectable()
export class UpdateImageDimensionService {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly httpService: HttpService,
    private readonly updateImageDimensionProvider: UpdateImageDimensionProvider,
    private readonly azureStorageProvider: AzureStorageProvider
  ) {}

  async updateImageDimension(activity: Activity): Promise<Activity> {
    Logger.log('Update Image Dimension', UpdateImageDimensionService.name);
    return {} as Activity;
  }
}
