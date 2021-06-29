import { Body, Controller, Get, Req } from '@nestjs/common';
import { AzureRequest } from '@nestjs/azure-func-http';

import { Activity } from '@dark-rush-photography/serverless/types';
import { UpdateVideoDimensionService } from './update-video-dimension.service';

@Controller('update-video-dimension')
export class UpdateVideoDimensionController {
  constructor(
    private readonly updateVideoDimensionService: UpdateVideoDimensionService
  ) {}

  @Get()
  async updateVideoDimension(
    @Req() request: AzureRequest,
    @Body() activity: Activity
  ): Promise<void> {
    request.context.done(
      null,
      await this.updateVideoDimensionService.updateVideoDimension(activity)
    );
  }
}
