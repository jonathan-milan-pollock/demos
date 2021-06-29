import { Body, Controller, Get, Req } from '@nestjs/common';
import { AzureRequest } from '@nestjs/azure-func-http';

import { Activity } from '@dark-rush-photography/serverless/types';
import { DataUriVideoService } from './data-uri-video.service';

@Controller('data-uri-video')
export class DataUriVideoController {
  constructor(private readonly dataUriVideoService: DataUriVideoService) {}

  @Get()
  async dataUriVideo(
    @Req() request: AzureRequest,
    @Body() activity: Activity
  ): Promise<void> {
    request.context.done(
      null,
      await this.dataUriVideoService.dataUriVideo(activity)
    );
  }
}
