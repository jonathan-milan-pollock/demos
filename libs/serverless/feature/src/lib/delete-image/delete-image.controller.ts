import { Body, Controller, Get, Req } from '@nestjs/common';
import { AzureRequest } from '@nestjs/azure-func-http';

import { Activity } from '@dark-rush-photography/serverless/types';
import { DeleteImageService } from './delete-image.service';

@Controller('delete-image')
export class DeleteImageController {
  constructor(private readonly deleteImageService: DeleteImageService) {}

  @Get()
  async deleteImage(
    @Req() request: AzureRequest,
    @Body() activity: Activity
  ): Promise<void> {
    request.context.done(
      null,
      await this.deleteImageService.deleteImage(activity)
    );
  }
}
