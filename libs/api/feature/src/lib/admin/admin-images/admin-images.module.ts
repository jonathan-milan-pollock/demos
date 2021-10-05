import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { AzureTableStorageModule } from '@nestjs/azure-database';

import {
  ContentDeleteBlobsProvider,
  ContentRemoveOneProvider,
  ContentRemoveProvider,
  Document,
  DocumentSchema,
  ImageFindProvider,
  ImageStateChangeProvider,
  ImageUpdateProvider,
  MediaProcessTable,
} from '@dark-rush-photography/api/data';
import { AdminImagesService } from './admin-images.service';
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
    AdminImagesService,
    ImageFindProvider,
    ImageUpdateProvider,
    ImageStateChangeProvider,
    ContentRemoveProvider,
    ContentRemoveOneProvider,
    ContentDeleteBlobsProvider,
  ],
})
export class AdminImagesModule {}
