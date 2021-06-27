import { AzureRequest } from '@nestjs/azure-func-http';
import { Injectable, Logger } from '@nestjs/common';

import { IHttpResponse } from 'durable-functions/lib/src/ihttpresponse';

import { PostImageProvider } from '@dark-rush-photography/serverless/data';
import { Activity } from '@dark-rush-photography/serverless/types';

@Injectable()
export class PostImageService {
  constructor(private readonly postImageProvider: PostImageProvider) {}

  async postImage(
    request: AzureRequest,
    activity: Activity
  ): Promise<IHttpResponse> {
    Logger.log('Post image', PostImageService.name);
    return this.postImageProvider
      .postImage$(request.context, activity.media)
      .toPromise();
  }
}
