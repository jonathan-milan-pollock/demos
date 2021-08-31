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
  GoogleDriveClientsProvider,
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
import { AdminGoogleDriveService } from './admin-google-drive.service';
import { AdminGoogleDriveController } from './admin-google-drive.controller';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
  ],
  controllers: [AdminGoogleDriveController],
  providers: [
    AdminGoogleDriveService,
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
    GoogleDriveClientsProvider,
    GoogleDriveWebsitesProvider,
    ProcessSyncImageProvider,
    TinifyImageProvider,
    ResizeImageProvider,
  ],
})
export class AdminGoogleDriveModule {}
