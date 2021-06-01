import { Body, Controller, Get, Req } from '@nestjs/common';

import { ImageProcess } from '@dark-rush-photography/serverless/types';
import { ResizeImageService } from './resize-image.service';
import { AzureRequest } from '@nestjs/azure-func-http';

@Controller('resize-image')
export class ResizeImageController {
  constructor(private readonly resizeImageService: ResizeImageService) {}

  @Get()
  async resizeImage(
    @Req() request: AzureRequest,
    @Body() imageProcess: ImageProcess
  ): Promise<void> {
    request.context.done(
      null,
      await this.resizeImageService.resizeImage(imageProcess)
    );
  }
}
