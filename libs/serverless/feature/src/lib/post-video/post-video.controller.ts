import { Body, Controller, Get, Req } from '@nestjs/common';
import { AzureRequest } from '@nestjs/azure-func-http';

import { Activity } from '@dark-rush-photography/serverless/types';
import { PostVideoService } from './post-video.service';

@Controller('post-video')
export class PostVideoController {
  constructor(private readonly postVideoService: PostVideoService) {}

  @Get()
  async postVideo(
    @Req() request: AzureRequest,
    @Body() activity: Activity
  ): Promise<void> {
    request.context.done(null, await this.postVideoService.postVideo(activity));
  }
}
