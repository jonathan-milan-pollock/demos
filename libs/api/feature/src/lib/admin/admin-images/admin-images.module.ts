import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { AzureTableStorageModule } from '@nestjs/azure-database';

import {
  ContentAddBlobProvider,
  ContentDeleteBlobsProvider,
  ContentRemoveOneProvider,
  ContentRemoveProvider,
  Document,
  DocumentSchema,
  ImageAddProvider,
  ImageFindProvider,
  ImageRemoveProvider,
  ImagesService,
  ImageStateChangeProvider,
  ImageUpdateProvider,
  MediaProcessTable,
} from '@dark-rush-photography/api/data';
import { AdminImagesController } from './admin-images.controller';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
    AzureTableStorageModule.forFeature(MediaProcessTable, {
      table: 'MediaProcess',
      createTableIfNotExists: true,
    }),
  ],
  controllers: [AdminImagesController],
  providers: [
    ImagesService,
    ImageAddProvider,
    ImageUpdateProvider,
    ImageStateChangeProvider,
    ImageRemoveProvider,
    ImageFindProvider,
    ContentAddBlobProvider,
    ContentRemoveProvider,
    ContentRemoveOneProvider,
    ContentDeleteBlobsProvider,
  ],
})
export class AdminImagesModule {}
