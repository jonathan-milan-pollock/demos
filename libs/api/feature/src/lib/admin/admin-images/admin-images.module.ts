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
  ImagePublishProvider,
  ImageProvider,
  ImageRemoveProvider,
  ImageLoadNewProvider,
  ImageUpdateProvider,
  ImageUploadProvider,
  PhotoOfTheWeekProvider,
  ImageResizeProvider,
  ReviewMediaProvider,
  ReviewProvider,
  SharedPhotoAlbumProvider,
  SocialMediaProvider,
  ImageTinifyProvider,
  ImageLoadNewFolderProvider,
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
    SocialMediaProvider,
    ImageProvider,
    ImageDimensionProvider,
    ImageLoadNewFolderProvider,
    ImageLoadNewProvider,
    ImageUploadProvider,
    ImageUpdateProvider,
    ImagePublishProvider,
    ImageRemoveProvider,
    ImageTinifyProvider,
    ImageResizeProvider,
  ],
})
export class AdminImagesModule {}
