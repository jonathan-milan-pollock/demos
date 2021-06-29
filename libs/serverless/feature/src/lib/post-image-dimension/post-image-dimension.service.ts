import { Injectable, Logger } from '@nestjs/common';

import {
  AzureStorageProvider,
  PostImageDimensionProvider,
} from '@dark-rush-photography/serverless/data';
import { Activity } from '@dark-rush-photography/serverless/types';

@Injectable()
export class PostImageDimensionService {
  constructor(
    private readonly postImageDimensionService: PostImageDimensionProvider,
    private readonly azureStorageProvider: AzureStorageProvider
  ) {}

  async postImageDimension(activity: Activity): Promise<Activity> {
    Logger.log('Post Image Dimension', PostImageDimensionService.name);
    return {} as Activity;
  }
}
