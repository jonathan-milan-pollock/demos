import { Body, Controller, Post, Req } from '@nestjs/common';
import { AzureRequest } from '@nestjs/azure-func-http';

import { Activity } from '@dark-rush-photography/serverless/types';
import { PostImageService } from './post-image.service';

@Controller('post-image')
export class PostImageController {
  constructor(private readonly postImageService: PostImageService) {}

  @Post()
  async postImage(
    @Req() request: AzureRequest,
    @Body() activity: Activity
  ): Promise<void> {
    request.context.done(null, await this.postImageService.postImage(activity));
  }
}
