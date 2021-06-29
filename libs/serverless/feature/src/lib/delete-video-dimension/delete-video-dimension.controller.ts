import { Body, Controller, Get, Req } from '@nestjs/common';
import { AzureRequest } from '@nestjs/azure-func-http';

import { Activity } from '@dark-rush-photography/serverless/types';
import { DeleteVideoDimensionService } from './delete-video-dimension.service';

@Controller('delete-video-dimension')
export class DeleteVideoDimensionController {
  constructor(
    private readonly deleteVideoDimensionService: DeleteVideoDimensionService
  ) {}

  @Get()
  async deleteVideoDimension(
    @Req() request: AzureRequest,
    @Body() activity: Activity
  ): Promise<void> {
    request.context.done(
      null,
      await this.deleteVideoDimensionService.deleteVideoDimension(activity)
    );
  }
}
