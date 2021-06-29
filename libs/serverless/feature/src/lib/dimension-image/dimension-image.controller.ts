import { Body, Controller, Get, Req } from '@nestjs/common';
import { AzureRequest } from '@nestjs/azure-func-http';

import { Activity } from '@dark-rush-photography/serverless/types';
import { DimensionImageService } from './dimension-image.service';

@Controller('dimension-image')
export class DimensionImageController {
  constructor(private readonly dimensionImageService: DimensionImageService) {}

  @Get()
  async dimensionImage(
    @Req() request: AzureRequest,
    @Body() activity: Activity
  ): Promise<void> {
    request.context.done(
      null,
      await this.dimensionImageService.dimensionImage(activity)
    );
  }
}
