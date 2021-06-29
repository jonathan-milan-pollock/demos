import { Body, Controller, Get, Req } from '@nestjs/common';
import { AzureRequest } from '@nestjs/azure-func-http';

import { Activity } from '@dark-rush-photography/serverless/types';
import { DeleteVideoService } from './delete-video.service';

@Controller('delete-video')
export class DeleteVideoController {
  constructor(private readonly deleteVideoService: DeleteVideoService) {}

  @Get()
  async deleteVideo(
    @Req() request: AzureRequest,
    @Body() activity: Activity
  ): Promise<void> {
    request.context.done(
      null,
      await this.deleteVideoService.deleteVideo(activity)
    );
  }
}
