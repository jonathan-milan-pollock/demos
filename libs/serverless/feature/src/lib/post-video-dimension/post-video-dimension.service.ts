import { AzureRequest } from '@nestjs/azure-func-http';
import { Injectable, Logger } from '@nestjs/common';

import { IHttpResponse } from 'durable-functions/lib/src/ihttpresponse';

import {
  AzureStorageProvider,
  PostVideoDimensionProvider,
} from '@dark-rush-photography/serverless/data';
import { Activity } from '@dark-rush-photography/serverless/types';

@Injectable()
export class PostVideoDimensionService {
  constructor(
    private readonly postVideoDimensionProvider: PostVideoDimensionProvider,
    private readonly azureStorageProvider: AzureStorageProvider
  ) {}

  async postVideoDimension(
    request: AzureRequest,
    activity: Activity
  ): Promise<IHttpResponse> {
    Logger.log('Post Video Dimension', PostVideoDimensionService.name);
    return this.postVideoDimensionProvider
      .postImage$(request.context, activity.media)
      .toPromise();
  }
}
