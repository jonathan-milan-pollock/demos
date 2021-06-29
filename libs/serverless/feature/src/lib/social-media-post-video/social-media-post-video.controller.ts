import { Body, Controller, Get, Req } from '@nestjs/common';
import { AzureRequest } from '@nestjs/azure-func-http';

import { Activity } from '@dark-rush-photography/serverless/types';
import { SocialMediaPostVideoService } from './social-media-post-video.service';

@Controller('social-media-post-video')
export class SocialMediaPostVideoController {
  constructor(
    private readonly socialMediaPostVideoService: SocialMediaPostVideoService
  ) {}

  @Get()
  async socialMediaPostVideo(
    @Req() request: AzureRequest,
    @Body() activity: Activity
  ): Promise<void> {
    request.context.done(
      null,
      await this.socialMediaPostVideoService.socialMediaPostVideo(activity)
    );
  }
}
