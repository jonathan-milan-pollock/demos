import { Module } from '@nestjs/common';
import { AzureTableStorageModule } from '@nestjs/azure-database';

import {
  GoogleDriveChannelTable,
  SharedPhotoAlbumTable,
} from '@dark-rush-photography/shared-server/data';
import { SharedPhotoAlbumProvider } from '@dark-rush-photography/api/data';
import { AdminSharedPhotoAlbumsService } from './admin-shared-photo-albums.service';
import { AdminSharedPhotoAlbumsController } from './admin-shared-photo-albums.controller';

@Module({
  imports: [
    AzureTableStorageModule.forFeature(GoogleDriveChannelTable, {
      table: 'GoogleDriveChannel',
      createTableIfNotExists: true,
    }),
    AzureTableStorageModule.forFeature(SharedPhotoAlbumTable, {
      table: 'SharedPhotoAlbum',
      createTableIfNotExists: true,
    }),
  ],
  controllers: [AdminSharedPhotoAlbumsController],
  providers: [AdminSharedPhotoAlbumsService, SharedPhotoAlbumProvider],
})
export class AdminSharedPhotoAlbumsModule {}
