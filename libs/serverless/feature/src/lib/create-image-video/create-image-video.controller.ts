import { Body, Controller, Get, Req } from '@nestjs/common';
import { AzureRequest } from '@nestjs/azure-func-http';

import { Activity } from '@dark-rush-photography/serverless/types';
import { CreateImageVideoService } from './create-image-video.service';

@Controller('create-image-video')
export class CreateImageVideoController {
  constructor(
    private readonly createImageVideoService: CreateImageVideoService
  ) {}

  @Get()
  async createImageVideo(
    @Req() request: AzureRequest,
    @Body() activity: Activity
  ): Promise<void> {
    request.context.done(
      null,
      await this.createImageVideoService.createImageVideo(activity)
    );
  }
}
