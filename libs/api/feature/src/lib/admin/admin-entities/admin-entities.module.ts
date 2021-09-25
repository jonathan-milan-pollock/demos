import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  AboutProvider,
  BestOfProvider,
  DestinationProvider,
  Document,
  DocumentSchema,
  EntityGroupProvider,
  EntityProvider,
  EntityPublishProvider,
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
  ],
  controllers: [AdminEntitiesController],
  providers: [
    AdminEntitiesService,
    EntityProvider,
    EntityGroupProvider,
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
