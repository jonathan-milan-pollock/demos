import { Body, Controller, Get, Req } from '@nestjs/common';
import { AzureRequest } from '@nestjs/azure-func-http';

import { Media } from '@dark-rush-photography/shared-server/types';
import { CreateImageVideoService } from './create-image-video.service';

@Controller('create-image-video')
export class CreateImageVideoController {
  constructor(
    private readonly createImageVideoService: CreateImageVideoService
  ) {}

  @Get()
  async createImageVideo(
    @Req() request: AzureRequest,
    @Body() medium: Media[]
  ): Promise<void> {
    request.context.done(
      null,
      await this.createImageVideoService.createImageVideo(medium)
    );
  }
}
