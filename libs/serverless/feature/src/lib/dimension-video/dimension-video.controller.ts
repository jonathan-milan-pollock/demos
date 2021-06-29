import { Body, Controller, Get, Req } from '@nestjs/common';
import { AzureRequest } from '@nestjs/azure-func-http';

import { Activity } from '@dark-rush-photography/serverless/types';
import { DimensionVideoService } from './dimension-video.service';

@Controller('dimension-video')
export class DimensionVideoController {
  constructor(private readonly dimensionVideoService: DimensionVideoService) {}

  @Get()
  async dimensionVideo(
    @Req() request: AzureRequest,
    @Body() activity: Activity
  ): Promise<void> {
    request.context.done(
      null,
      await this.dimensionVideoService.dimensionVideo(activity)
    );
  }
}
