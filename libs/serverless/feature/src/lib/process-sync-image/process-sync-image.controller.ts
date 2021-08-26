import { Body, Controller, Get, Req } from '@nestjs/common';
import { AzureRequest } from '@nestjs/azure-func-http';

import { SyncImage } from '@dark-rush-photography/shared-server/types';
import { ProcessSyncImageService } from './process-sync-image.service';

@Controller('process-sync-image')
export class ProcessSyncImageController {
  constructor(
    private readonly processSyncImageService: ProcessSyncImageService
  ) {}

  @Get()
  async processSyncImage(
    @Req() request: AzureRequest,
    @Body() syncImage: SyncImage
  ): Promise<void> {
    request.context.done(
      null,
      await this.processSyncImageService.processSyncImage(syncImage)
    );
  }
}
