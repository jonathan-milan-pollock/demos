import { Body, Controller, Get, Req } from '@nestjs/common';
import { AzureRequest } from '@nestjs/azure-func-http';

import { Activity } from '@dark-rush-photography/serverless/types';
import { ExifVideoService } from './exif-video.service';

@Controller('exif-video')
export class ExifVideoController {
  constructor(private readonly exifVideoService: ExifVideoService) {}

  @Get()
  async exifVideo(
    @Req() request: AzureRequest,
    @Body() activity: Activity
  ): Promise<void> {
    request.context.done(null, await this.exifVideoService.exifVideo(activity));
  }
}
