import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AzureTableStorageModule } from '@nestjs/azure-database';

import {
  AboutProvider,
  BestOfProvider,
  DestinationProvider,
  Document,
  DocumentSchema,
  EntityLoadProvider,
  EntityPublishProvider,
  EntityPushNotificationsTable,
  EntitySocialMediaPostProvider,
  EventProvider,
  FavoritesProvider,
  ImageDimensionProvider,
  ImageProvider,
  ImagePublishProvider,
  ImageRemoveProvider,
  ImageResizeProvider,
  ImageTinifyProvider,
  ImageUpdateProvider,
  PhotoOfTheWeekProvider,
  ReviewMediaProvider,
  ReviewProvider,
  SharedPhotoAlbumLoadProvider,
  SharedPhotoAlbumProvider,
  SharedPhotoAlbumPublishProvider,
  SocialMediaProvider,
  VideoProvider,
  VideoRemoveProvider,
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
    EntityLoadProvider,
    EntityPublishProvider,
    EntitySocialMediaPostProvider,
    AboutProvider,
    BestOfProvider,
    DestinationProvider,
    EventProvider,
    FavoritesProvider,
    PhotoOfTheWeekProvider,
    ReviewMediaProvider,
    ReviewProvider,
    SharedPhotoAlbumProvider,
    SharedPhotoAlbumLoadProvider,
    SharedPhotoAlbumPublishProvider,
    SocialMediaProvider,
    ImageProvider,
    ImageDimensionProvider,
    ImagePublishProvider,
    ImageUpdateProvider,
    ImageRemoveProvider,
    VideoProvider,
    VideoRemoveProvider,
    ImageTinifyProvider,
    ImageResizeProvider,
  ],
})
export class AdminEntitiesModule {}
