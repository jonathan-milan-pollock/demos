import { Body, Controller, Get, Req } from '@nestjs/common';
import { AzureRequest } from '@nestjs/azure-func-http';

import { ResizeVideoService } from './resize-video.service';

@Controller('resize-video')
export class ResizeVideoController {
  constructor(private readonly resizeVideoService: ResizeVideoService) {}

  @Get()
  async tinifyImage(
    @Req() request: AzureRequest,
    @Body() activity: Activity
  ): Promise<void> {
    request.context.done(
      null,
      await this.resizeVideoService.resizeVideo(activity)
    );
  }
}
