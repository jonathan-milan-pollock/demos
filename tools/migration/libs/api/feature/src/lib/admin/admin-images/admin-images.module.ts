import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { AzureTableStorageModule } from '@nestjs/azure-database';

import {
  CronProcessRepositoryProvider,
  CronProcessTable,
  Document,
  DocumentSchema,
  ImageAddBlobProvider,
  ImageAddProvider,
  ImageDeleteBlobsProvider,
  ImageOrderProvider,
  ImageRemoveOneProvider,
  ImagesService,
  ImageStateChangeProvider,
} from '@dark-rush-photography/api/data';
import { AdminImagesController } from './admin-images.controller';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
    AzureTableStorageModule.forFeature(CronProcessTable, {
      table: 'CronProcess',
      createTableIfNotExists: true,
    }),
  ],
  controllers: [AdminImagesController],
  providers: [
    {
      provide: CronProcessRepositoryProvider.name,
      useClass: CronProcessRepositoryProvider,
    },
    ImagesService,
    ImageAddProvider,
    ImageAddBlobProvider,
    ImageOrderProvider,
    ImageStateChangeProvider,
    ImageRemoveOneProvider,
    ImageDeleteBlobsProvider,
  ],
})
export class AdminImagesModule {}
