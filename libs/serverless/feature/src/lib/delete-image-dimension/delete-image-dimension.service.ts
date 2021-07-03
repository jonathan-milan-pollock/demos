import { Injectable, Inject, HttpService, Logger } from '@nestjs/common';

import { ENV } from '@dark-rush-photography/shared/types';
import { Env, Activity } from '@dark-rush-photography/serverless/types';
import {
  AzureStorageProvider,
  DeleteImageDimensionProvider,
} from '@dark-rush-photography/serverless/data';

@Injectable()
export class DeleteImageDimensionService {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly httpService: HttpService,
    private readonly deleteImageDimensionProvider: DeleteImageDimensionProvider,
    private readonly azureStorageProvider: AzureStorageProvider
  ) {}

  async deleteImageDimension(activity: Activity): Promise<Activity> {
    Logger.log('Delete Image Dimension', DeleteImageDimensionService.name);
    return {} as Activity;
  }
}
