import { Body, Controller, Get, Req } from '@nestjs/common';
import { AzureRequest } from '@nestjs/azure-func-http';

import { ImageProcessActivity } from '@dark-rush-photography/serverless/types';
import { TinifyImageService } from './tinify-image.service';

@Controller('tinify-image')
export class TinifyImageController {
  constructor(private readonly tinifyImageService: TinifyImageService) {}

  @Get()
  async tinifyImage(
    @Req() request: AzureRequest,
    @Body() imageProcessActivity: ImageProcessActivity
  ): Promise<void> {
    request.context.done(
      null,
      await this.tinifyImageService.tinifyImage(imageProcessActivity)
    );
  }
}
