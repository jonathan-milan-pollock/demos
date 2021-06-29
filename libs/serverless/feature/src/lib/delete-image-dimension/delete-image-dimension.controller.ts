import { Body, Controller, Get, Req } from '@nestjs/common';
import { AzureRequest } from '@nestjs/azure-func-http';

import { Activity } from '@dark-rush-photography/serverless/types';
import { DeleteImageDimensionService } from './delete-image-dimension.service';

@Controller('delete-image-dimension')
export class DeleteImageDimensionController {
  constructor(
    private readonly deleteImageDimensionService: DeleteImageDimensionService
  ) {}

  @Get()
  async deleteImageDimension(
    @Req() request: AzureRequest,
    @Body() activity: Activity
  ): Promise<void> {
    request.context.done(
      null,
      await this.deleteImageDimensionService.deleteImageDimension(activity)
    );
  }
}
