import { AzureRequest } from '@nestjs/azure-func-http';
import { Injectable } from '@nestjs/common';

import { IHttpResponse } from 'durable-functions/lib/src/ihttpresponse';

import { PublishedImage } from '@dark-rush-photography/serverless/types';
import { PostImageProcessService } from '@dark-rush-photography/serverless/data';

@Injectable()
export class PostImageService {
  constructor(
    private readonly postImageProcessService: PostImageProcessService
  ) {}

  async postImage(
    request: AzureRequest,
    publishedImage: PublishedImage
  ): Promise<IHttpResponse> {
    return this.postImageProcessService
      .process$(request.context, publishedImage)
      .toPromise();
  }
}
