import { Module } from '@nestjs/common';
import { AzureTableStorageModule } from '@nestjs/azure-database';

import {
  SharedPhotoAlbumProvider,
  SharedWithProvider,
} from '@dark-rush-photography/api/data';
import { SharedPhotoAlbumTable } from '@dark-rush-photography/shared-server/data';
import { AdminSharedWithService } from './admin-shared-with.service';
import { AdminSharedWithController } from './admin-shared-with.controller';

@Module({
  imports: [
    AzureTableStorageModule.forFeature(SharedPhotoAlbumTable, {
      table: 'SharedPhotoAlbum',
      createTableIfNotExists: true,
    }),
  ],
  controllers: [AdminSharedWithController],
  providers: [
    AdminSharedWithService,
    SharedWithProvider,
    SharedPhotoAlbumProvider,
  ],
})
export class AdminSharedWithModule {}
