import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';

import {
  AboutProvider,
  BestOfProvider,
  DestinationProvider,
  Document,
  DocumentSchema,
  EventProvider,
  FavoritesProvider,
  ImageDimensionProvider,
  ImageLoadNewImageProvider,
  ImageLoadNewProvider,
  ImageProvider,
  ImagePublishProvider,
  ImageRemoveProvider,
  ImageResizeProvider,
  ImageTinifyProvider,
  ImageUpdateProvider,
  ImageUploadProvider,
  PhotoOfTheWeekProvider,
  ReviewMediaProvider,
  ReviewProvider,
  SharedPhotoAlbumLoadProvider,
  SharedPhotoAlbumProvider,
  SocialMediaProvider,
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
    SocialMediaProvider,
    ImageProvider,
    ImageDimensionProvider,
    ImageLoadNewProvider,
    ImageLoadNewImageProvider,
    ImageUploadProvider,
    ImageUpdateProvider,
    ImagePublishProvider,
    ImageRemoveProvider,
    ImageTinifyProvider,
    ImageResizeProvider,
  ],
})
export class AdminImagesModule {}
