import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { AzureTableStorageModule } from '@nestjs/azure-database';

import {
  CronProcessStartProvider,
  CronProcessStartTypeProvider,
  CronProcessStateProvider,
  CronProcessStateUpdateProvider,
  CronProcessTable,
  Document,
  DocumentSchema,
  ImageAddBlobProvider,
  ImageAddProvider,
  ImageDeleteBlobsProvider,
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
    ImagesService,
    ImageAddProvider,
    ImageAddBlobProvider,
    ImageStateChangeProvider,
    ImageRemoveOneProvider,
    ImageDeleteBlobsProvider,
    CronProcessStartProvider,
    CronProcessStartTypeProvider,
    CronProcessStateProvider,
    CronProcessStateUpdateProvider,
  ],
})
export class AdminImagesModule {}
