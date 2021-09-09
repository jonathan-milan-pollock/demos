import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';

import {
  AboutProvider,
  BestOfProvider,
  DestinationProvider,
  Document,
  DocumentSchema,
  EntityProvider,
  EventProvider,
  FavoritesProvider,
  GoogleDriveWebsitesProvider,
  ImageDimensionProvider,
  ImageProvider,
  ImageRemoveProvider,
  ImageUploadProvider,
  PhotoOfTheWeekProvider,
  ProcessSyncImageProvider,
  ResizeImageProvider,
  ReviewMediaProvider,
  ReviewProvider,
  SocialMediaProvider,
  TinifyImageProvider,
} from '@dark-rush-photography/api/data';
import { AdminGoogleDriveWebsitesService } from './admin-google-drive-websites.service';
import { AdminGoogleDriveWebsitesController } from './admin-google-drive-websites.controller';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
  ],
  controllers: [AdminGoogleDriveWebsitesController],
  providers: [
    AdminGoogleDriveWebsitesService,
    EntityProvider,
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
    ImageUploadProvider,
    ImageRemoveProvider,
    ImageDimensionProvider,
    GoogleDriveWebsitesProvider,
    ProcessSyncImageProvider,
    TinifyImageProvider,
    ResizeImageProvider,
  ],
})
export class AdminGoogleDriveWebsitesModule {}
