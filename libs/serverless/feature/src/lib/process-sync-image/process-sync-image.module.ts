import { Module } from '@nestjs/common';
import { AzureTableStorageModule } from '@nestjs/azure-database';

import { SyncedImageTable } from '@dark-rush-photography/shared-server/data';
import {
  ProcessSyncImageProvider,
  ResizeImageProvider,
  TinifyImageProvider,
} from '@dark-rush-photography/serverless/data';
import { ProcessSyncImageService } from './process-sync-image.service';
import { ProcessSyncImageController } from './process-sync-image.controller';

@Module({
  imports: [
    AzureTableStorageModule.forFeature(SyncedImageTable, {
      table: 'SyncedImage',
      createTableIfNotExists: true,
    }),
  ],
  controllers: [ProcessSyncImageController],
  providers: [
    ProcessSyncImageService,
    ProcessSyncImageProvider,
    TinifyImageProvider,
    ResizeImageProvider,
  ],
})
export class ProcessSyncImageModule {}
