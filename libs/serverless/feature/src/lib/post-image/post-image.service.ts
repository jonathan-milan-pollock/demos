import { AzureRequest } from '@nestjs/azure-func-http';
import { Injectable } from '@nestjs/common';

import { IHttpResponse } from 'durable-functions/lib/src/ihttpresponse';

import { PublishedImage } from '@dark-rush-photography/serverless/types';
import { PostImageActivityProvider } from '@dark-rush-photography/serverless/data';

@Injectable()
export class PostImageService {
  constructor(
    private readonly postImageActivityProvider: PostImageActivityProvider
  ) {}

  async postImage(
    request: AzureRequest,
    publishedImage: PublishedImage
  ): Promise<IHttpResponse> {
    return this.postImageActivityProvider
      .postImage$(request.context, publishedImage)
      .toPromise();
  }
}
