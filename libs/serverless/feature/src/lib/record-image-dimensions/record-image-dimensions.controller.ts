import { Body, Controller, Get, Req } from '@nestjs/common';
import { AzureRequest } from '@nestjs/azure-func-http';

import { PublishedImage } from '@dark-rush-photography/serverless/types';
import { RecordImageDimensionsService } from './record-image-dimensions.service';

@Controller('record-image-dimensions')
export class RecordImageDimensionsController {
  constructor(
    private readonly recordImageDimensionsService: RecordImageDimensionsService
  ) {}

  @Get()
  async recordImageDimensions(
    @Req() request: AzureRequest,
    @Body() publishedImage: PublishedImage
  ): Promise<void> {
    request.context.done(
      null,
      await this.recordImageDimensionsService.recordImageDimensions(
        publishedImage
      )
    );
  }
}
