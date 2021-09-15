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
  EventProvider,
  FavoritesProvider,
  ImageDimensionProvider,
  ImageProvider,
  ImageRemoveProvider,
  ImageUpdateProvider,
  PhotoOfTheWeekProvider,
  ImageResizeProvider,
  ReviewMediaProvider,
  ReviewProvider,
  SocialMediaProvider,
  ImageTinifyProvider,
  VideoProvider,
  VideoRemoveProvider,
  SharedPhotoAlbumProvider,
  ImagePublishProvider,
  EntityPublishProvider,
  EntitySocialMediaPostProvider,
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
