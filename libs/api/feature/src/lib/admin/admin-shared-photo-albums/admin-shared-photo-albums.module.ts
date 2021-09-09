import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AzureTableStorageModule } from '@nestjs/azure-database';

import {
  Document,
  DocumentSchema,
  GoogleDriveChannelTable,
  SharedPhotoAlbumProvider,
} from '@dark-rush-photography/api/data';
import { AdminSharedPhotoAlbumsService } from './admin-shared-photo-albums.service';
import { AdminSharedPhotoAlbumsController } from './admin-shared-photo-albums.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
    AzureTableStorageModule.forFeature(GoogleDriveChannelTable, {
      table: 'GoogleDriveChannel',
      createTableIfNotExists: true,
    }),
  ],
  controllers: [AdminSharedPhotoAlbumsController],
  providers: [AdminSharedPhotoAlbumsService, SharedPhotoAlbumProvider],
})
export class AdminSharedPhotoAlbumsModule {}
