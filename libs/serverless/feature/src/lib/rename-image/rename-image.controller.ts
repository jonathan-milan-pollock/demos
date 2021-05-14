import { Body, Controller, Get, Req } from '@nestjs/common';
import { AzureRequest } from '@nestjs/azure-func-http';

import { PublishedImage } from '@dark-rush-photography/serverless/types';
import { ResizeImageService } from './resize-image.service';

@Controller('resize-image')
export class ResizeImageController {
  constructor(private readonly resizeImageService: ResizeImageService) {}

  @Get()
  async resizeImage(
    @Req() request: AzureRequest,
    @Body() publishedImage: PublishedImage
  ): Promise<void> {
    request.context.done(
      null,
      await this.resizeImageService.resizeImage(publishedImage)
    );
  }
}
