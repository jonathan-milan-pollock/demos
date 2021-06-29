import { Injectable, Inject, HttpService, Logger } from '@nestjs/common';

import { ENV } from '@dark-rush-photography/shared-types';
import { Env, Activity } from '@dark-rush-photography/serverless/types';
import {
  AzureStorageProvider,
  DeleteImageProvider,
} from '@dark-rush-photography/serverless/data';

@Injectable()
export class DeleteImageService {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly httpService: HttpService,
    private readonly deleteImageProvider: DeleteImageProvider,
    private readonly azureStorageProvider: AzureStorageProvider
  ) {}

  async deleteImage(activity: Activity): Promise<Activity> {
    Logger.log('Delete Image', DeleteImageService.name);
    return {} as Activity;
  }
}
