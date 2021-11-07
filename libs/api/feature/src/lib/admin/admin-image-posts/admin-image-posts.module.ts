import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AzureTableStorageModule } from '@nestjs/azure-database';

import {
  CronProcessRepositoryProvider,
  CronProcessTable,
  Document,
  DocumentSchema,
  ImageAddBlobProvider,
  ImageAddProvider,
  ImagePostsService,
} from '@dark-rush-photography/api/data';
import { AdminImagePostsController } from './admin-image-posts.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
    AzureTableStorageModule.forFeature(CronProcessTable, {
      table: 'CronProcess',
      createTableIfNotExists: true,
    }),
  ],
  controllers: [AdminImagePostsController],
  providers: [
    {
      provide: CronProcessRepositoryProvider.name,
      useClass: CronProcessRepositoryProvider,
    },
    ImagePostsService,
    ImageAddProvider,
    ImageAddBlobProvider,
  ],
})
export class AdminImagePostsModule {}
