import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AzureTableStorageModule } from '@nestjs/azure-database';

import {
  AdminEntitiesService,
  ContentAddBlobProvider,
  ContentDeleteBlobsProvider,
  ContentRemoveOneProvider,
  ContentRemoveProvider,
  Document,
  DocumentSchema,
  EntityCreateForFolderProvider,
  EntityCreateProvider,
  EntityCreateWatermarkedTypeProvider,
  EntityDeleteProvider,
  EntityFindAllProvider,
  EntityGroupFindProvider,
  EntityGroupProvider,
  EntityLoadNewImagesProvider,
  EntityPublishProvider,
  ImageAddProvider,
  ImageExifProvider,
  ImageFolderProvider,
  ImageProcessProvider,
  ImageResizeProvider,
  ImageTinifyProvider,
  MediaProcessTable,
} from '@dark-rush-photography/api/data';
import { AdminEntitiesController } from './admin-entities.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
    AzureTableStorageModule.forFeature(MediaProcessTable, {
      table: 'MediaProcess',
      createTableIfNotExists: true,
    }),
  ],
  controllers: [AdminEntitiesController],
  providers: [
    AdminEntitiesService,
    EntityGroupProvider,
    EntityGroupFindProvider,
    EntityCreateProvider,
    EntityCreateWatermarkedTypeProvider,
    EntityCreateForFolderProvider,
    EntityFindAllProvider,
    EntityLoadNewImagesProvider,
    EntityPublishProvider,
    EntityDeleteProvider,
    ImageFolderProvider,
    ImageAddProvider,
    ImageProcessProvider,
    ImageTinifyProvider,
    ImageExifProvider,
    ImageResizeProvider,
    ContentAddBlobProvider,
    ContentRemoveProvider,
    ContentRemoveOneProvider,
    ContentDeleteBlobsProvider,
  ],
})
export class AdminEntitiesModule {}
