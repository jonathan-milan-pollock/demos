import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AzureTableStorageModule } from '@nestjs/azure-database';

import {
  ContentDeleteBlobsProvider,
  ContentRemoveOneProvider,
  ContentRemoveProvider,
  Document,
  DocumentSchema,
  EntityCreateProvider,
  EntityCreateWatermarkedTypeProvider,
  EntityDeleteProvider,
  EntityFindProvider,
  EntityGroupProvider,
  EntityPublishProvider,
  EntitySocialMediaPostProvider,
  ImageAddNewProvider,
  ImageFindProvider,
  ImageFolderProvider,
  ImageLoadNewProvider,
  ImageProcessProvider,
  ImageStateChangeProvider,
  MediaProcessStartProvider,
  MediaProcessTable,
} from '@dark-rush-photography/api/data';
import { AdminEntitiesService } from './admin-entities.service';
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
    EntityCreateProvider,
    EntityCreateWatermarkedTypeProvider,
    EntityFindProvider,
    EntityPublishProvider,
    EntitySocialMediaPostProvider,
    EntityDeleteProvider,
    ImageLoadNewProvider,
    ImageFolderProvider,
    ImageAddNewProvider,
    ImageFindProvider,
    ImageStateChangeProvider,
    ImageProcessProvider,
    ContentRemoveProvider,
    ContentRemoveOneProvider,
    ContentDeleteBlobsProvider,
    MediaProcessStartProvider,
  ],
})
export class AdminEntitiesModule {}
