import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  AboutProvider,
  BestOfProvider,
  DestinationProvider,
  Document,
  DocumentSchema,
  ImagesProcessProvider,
  EntityLoadProvider,
  EntityDeleteProvider,
  EntityPostProvider,
  EntityProvider,
  EntityUpdateProvider,
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
    EntityLoadProvider,
    EntityUpdateProvider,
    EntityPostProvider,
    EntityDeleteProvider,
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
