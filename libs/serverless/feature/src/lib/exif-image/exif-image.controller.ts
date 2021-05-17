import { Body, Controller, Get, Req } from '@nestjs/common';
import { AzureRequest } from '@nestjs/azure-func-http';

import { ImageProcessActivity } from '@dark-rush-photography/serverless/types';
import { ExifImageService } from './exif-image.service';

@Controller('exif-image')
export class ExifImageController {
  constructor(private readonly exifImageService: ExifImageService) {}

  @Get()
  async exifImage(
    @Req() request: AzureRequest,
    @Body() imageProcessActivity: ImageProcessActivity
  ): Promise<void> {
    request.context.done(
      null,
      await this.exifImageService.exifImage(
        imageProcessActivity,
        new Date().getFullYear()
      )
    );
  }
}
