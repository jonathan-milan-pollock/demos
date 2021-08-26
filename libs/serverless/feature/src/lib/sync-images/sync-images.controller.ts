import { Body, Controller, Post, Req } from '@nestjs/common';
import { AzureRequest } from '@nestjs/azure-func-http';

import { SyncImage } from '@dark-rush-photography/shared-server/types';
import { SyncImagesService } from './sync-images.service';

@Controller('sync-images')
export class SyncImagesController {
  constructor(private readonly syncImagesService: SyncImagesService) {}

  @Post()
  async sync(
    @Req() request: AzureRequest,
    @Body() syncImages: SyncImage[]
  ): Promise<void> {
    request.context.done(
      null,
      await this.syncImagesService.sync(request, syncImages)
    );
  }
}
