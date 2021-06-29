import { Body, Controller, Post, Req } from '@nestjs/common';
import { AzureRequest } from '@nestjs/azure-func-http';

import { Activity } from '@dark-rush-photography/serverless/types';
import { PostVideoDimensionService } from './post-video-dimension.service';

@Controller('post-video-dimension')
export class PostVideoDimensionController {
  constructor(
    private readonly postVideoDimensionService: PostVideoDimensionService
  ) {}

  @Post()
  async postVideoDimension(
    @Req() request: AzureRequest,
    @Body() activity: Activity
  ): Promise<void> {
    request.context.done(
      null,
      await this.postVideoDimensionService.postVideoDimension(request, activity)
    );
  }
}
