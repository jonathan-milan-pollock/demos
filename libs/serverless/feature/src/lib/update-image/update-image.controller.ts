import { Body, Controller, Get, Req } from '@nestjs/common';
import { AzureRequest } from '@nestjs/azure-func-http';

import { Activity } from '@dark-rush-photography/serverless/types';
import { UpdateImageService } from './update-image.service';

@Controller('update-image')
export class UpdateImageController {
  constructor(private readonly updateImageService: UpdateImageService) {}

  @Get()
  async updateImage(
    @Req() request: AzureRequest,
    @Body() activity: Activity
  ): Promise<void> {
    request.context.done(
      null,
      await this.updateImageService.updateImage(activity)
    );
  }
}
