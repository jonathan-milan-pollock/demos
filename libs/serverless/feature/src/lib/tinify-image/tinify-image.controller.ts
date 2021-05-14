import { Body, Controller, Get, Req } from '@nestjs/common';
import { AzureRequest } from '@nestjs/azure-func-http';

import { PublishedImage } from '@dark-rush-photography/serverless/types';
import { TinifyImageService } from './tinify-image.service';

@Controller('tinify-image')
export class TinifyImageController {
  constructor(private readonly tinifyImageService: TinifyImageService) {}

  @Get()
  async tinifyImage(
    @Req() request: AzureRequest,
    @Body() publishedImage: PublishedImage
  ): Promise<void> {
    request.context.done(
      null,
      await this.tinifyImageService.tinifyImage(publishedImage)
    );
  }
}
