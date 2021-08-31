import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Document,
  DocumentSchema,
  EntityProvider,
  GoogleDriveWebsitesProvider,
  ImageDimensionProvider,
  ImageProvider,
  ImageRemoveProvider,
  ImageUploadProvider,
  PhotoOfTheWeekProvider,
  ProcessSyncImageProvider,
  ResizeImageProvider,
  TinifyImageProvider,
} from '@dark-rush-photography/api/data';
import { PhotoOfTheWeekService } from './photo-of-the-week.service';
import { PhotoOfTheWeekController } from './photo-of-the-week.controller';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
  ],
  controllers: [PhotoOfTheWeekController],
  providers: [
    PhotoOfTheWeekService,
    EntityProvider,
    PhotoOfTheWeekProvider,
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
export class PhotoOfTheWeekModule {}
