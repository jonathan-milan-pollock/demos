import { Body, Controller, Get, Req } from '@nestjs/common';
import { AzureRequest } from '@nestjs/azure-func-http';

import { ImageProcessActivity } from '@dark-rush-photography/serverless/types';
import { ResizeImageService } from './resize-image.service';

@Controller('resize-image')
export class ResizeImageController {
  constructor(private readonly resizeImageService: ResizeImageService) {}

  @Get()
  async resizeImage(
    @Req() request: AzureRequest,
    @Body() imageProcessActivity: ImageProcessActivity
  ): Promise<void> {
    request.context.done(
      null,
      await this.resizeImageService.resizeImage(imageProcessActivity)
    );
  }
}
