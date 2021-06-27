import { Body, Controller, Get, Req } from '@nestjs/common';
import { AzureRequest } from '@nestjs/azure-func-http';

import { Activity } from '@dark-rush-photography/serverless/types';
import { AddImageService } from './add-image.service';

@Controller('add-image')
export class AddImageController {
  constructor(private readonly addImageService: AddImageService) {}

  @Get()
  async tinifyImage(
    @Req() request: AzureRequest,
    @Body() activity: Activity
  ): Promise<void> {
    request.context.done(null, await this.addImageService.addImage(activity));
  }
}
