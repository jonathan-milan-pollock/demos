import { AzureRequest } from '@nestjs/azure-func-http';
import { Injectable, Logger } from '@nestjs/common';

import { IHttpResponse } from 'durable-functions/lib/src/ihttpresponse';

import {
  AzureStorageProvider,
  PostImageProvider,
} from '@dark-rush-photography/serverless/data';
import { Activity } from '@dark-rush-photography/serverless/types';

@Injectable()
export class PostImageService {
  constructor(
    private readonly postImageProvider: PostImageProvider,
    private readonly azureStorageProvider: AzureStorageProvider
  ) {}

  async postImage(activity: Activity): Promise<Activity> {
    Logger.log('Post Image', PostImageService.name);
    return {} as Activity;
  }
}
