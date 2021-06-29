import { Body, Controller, Get, Req } from '@nestjs/common';
import { AzureRequest } from '@nestjs/azure-func-http';

import { Activity } from '@dark-rush-photography/serverless/types';
import { UpdateImageDimensionService } from './update-image-dimension.service';

@Controller('update-image-dimension')
export class UpdateImageDimensionController {
  constructor(
    private readonly updateImageDimensionService: UpdateImageDimensionService
  ) {}

  @Get()
  async updateImage(
    @Req() request: AzureRequest,
    @Body() activity: Activity
  ): Promise<void> {
    request.context.done(
      null,
      await this.updateImageDimensionService.updateImageDimension(activity)
    );
  }
}
