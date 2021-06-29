import { Body, Controller, Get, Req } from '@nestjs/common';
import { AzureRequest } from '@nestjs/azure-func-http';

import { Activity } from '@dark-rush-photography/serverless/types';
import { DataUriImageService } from './data-uri-image.service';

@Controller('data-uri-image')
export class DataUriImageController {
  constructor(private readonly dataUriImageService: DataUriImageService) {}

  @Get()
  async dataUriImage(
    @Req() request: AzureRequest,
    @Body() activity: Activity
  ): Promise<void> {
    request.context.done(
      null,
      await this.dataUriImageService.dataUriImage(activity)
    );
  }
}
