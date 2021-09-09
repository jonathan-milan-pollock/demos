import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';

import {
  AboutProvider,
  BestOfProvider,
  DestinationProvider,
  Document,
  DocumentSchema,
  EntityLoadProvider,
  EntityProvider,
  EventProvider,
  FavoritesProvider,
  ImageDimensionProvider,
  ImageProcessProvider,
  ImageProvider,
  ImageRemoveProvider,
  ImagesProcessProvider,
  ImageUpdateProvider,
  ImageUploadProvider,
  PhotoOfTheWeekProvider,
  ResizeImageProvider,
  ReviewMediaProvider,
  ReviewProvider,
  SharedPhotoAlbumProvider,
  SocialMediaProvider,
  TinifyImageProvider,
} from '@dark-rush-photography/api/data';
import { AdminImagesService } from './admin-images.service';
import { AdminImagesController } from './admin-images.controller';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
  ],
  controllers: [AdminImagesController],
  providers: [
    AdminImagesService,
    EntityProvider,
    EntityLoadProvider,
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
    ImageUploadProvider,
    ImagesProcessProvider,
    ImageProcessProvider,
    ImageUpdateProvider,
    ImageRemoveProvider,
    ImageDimensionProvider,
    TinifyImageProvider,
    ResizeImageProvider,
  ],
})
export class AdminImagesModule {}
