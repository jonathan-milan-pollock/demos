import { Body, Controller, Get, Req } from '@nestjs/common';
import { AzureRequest } from '@nestjs/azure-func-http';

import { Activity } from '@dark-rush-photography/serverless/types';
import { UpdateVideoService } from './update-video.service';

@Controller('update-video')
export class UpdateVideoController {
  constructor(private readonly updateVideoService: UpdateVideoService) {}

  @Get()
  async updateVideo(
    @Req() request: AzureRequest,
    @Body() activity: Activity
  ): Promise<void> {
    request.context.done(
      null,
      await this.updateVideoService.updateVideo(activity)
    );
  }
}
