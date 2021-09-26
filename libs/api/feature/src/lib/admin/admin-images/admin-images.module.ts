import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { AzureTableStorageModule } from '@nestjs/azure-database';

import {
  Document,
  DocumentSchema,
  EntityPushNotificationsTable,
  ImageDimensionProvider,
  ImageLoadNewProvider,
  ImageProcessNewProvider,
  ImageProvider,
  ImagePublishProvider,
  ImageRemoveProvider,
  ImageResizeProvider,
  ImageTinifyProvider,
  ImageUpdateProvider,
  ImageUploadProvider,
} from '@dark-rush-photography/api/data';
import { AdminImagesService } from './admin-images.service';
import { AdminImagesController } from './admin-images.controller';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
    AzureTableStorageModule.forFeature(EntityPushNotificationsTable, {
      table: 'EntityPushNotifications',
      createTableIfNotExists: true,
    }),
  ],
  controllers: [AdminImagesController],
  providers: [
    AdminImagesService,
    ImageProvider,
    ImageDimensionProvider,
    ImageLoadNewProvider,
    ImageProcessNewProvider,
    ImageUploadProvider,
    ImageUpdateProvider,
    ImagePublishProvider,
    ImageRemoveProvider,
    ImageTinifyProvider,
    ImageResizeProvider,
  ],
})
export class AdminImagesModule {}
