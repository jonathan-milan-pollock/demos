import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AzureTableStorageModule } from '@nestjs/azure-database';

import {
  AboutProvider,
  BestOfProvider,
  DestinationProvider,
  Document,
  DocumentSchema,
  ImagesProcessProvider,
  EntityLoadProvider,
  EntityPostProvider,
  EntityProvider,
  EventProvider,
  FavoritesProvider,
  ImageDimensionProvider,
  ImageProvider,
  ImageRemoveProvider,
  ImageUpdateProvider,
  PhotoOfTheWeekProvider,
  ResizeImageProvider,
  ReviewMediaProvider,
  ReviewProvider,
  SocialMediaProvider,
  TinifyImageProvider,
  VideoProvider,
  VideoRemoveProvider,
  SharedPhotoAlbumProvider,
  ImageProcessProvider,
  EntityPushNotificationsTable,
} from '@dark-rush-photography/api/data';
import { AdminEntitiesService } from './admin-entities.service';
import { AdminEntitiesController } from './admin-entities.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
    AzureTableStorageModule.forFeature(EntityPushNotificationsTable, {
      table: 'EntityPushNotifications',
      createTableIfNotExists: true,
    }),
  ],
  controllers: [AdminEntitiesController],
  providers: [
    AdminEntitiesService,
    EntityProvider,
    EntityLoadProvider,
    EntityPostProvider,
    AboutProvider,
    BestOfProvider,
    DestinationProvider,
    EventProvider,
    FavoritesProvider,
    PhotoOfTheWeekProvider,
    ReviewMediaProvider,
    ReviewProvider,
    SharedPhotoAlbumProvider,
    SocialMediaProvider,
    ImageProvider,
    ImagesProcessProvider,
    ImageProcessProvider,
    ImageUpdateProvider,
    ImageRemoveProvider,
    ImageDimensionProvider,
    VideoProvider,
    VideoRemoveProvider,
    TinifyImageProvider,
    ResizeImageProvider,
  ],
})
export class AdminEntitiesModule {}
