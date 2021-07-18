import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Document,
  DocumentSchema,
  EntityDeleteProvider,
  EntityPostProvider,
  EntityProvider,
  EntityUpdateProvider,
  ImageDimensionProvider,
  ImageProvider,
  ImageRemoveProvider,
  ImageUpdateProvider,
  MediaProvider,
  PhotoOfTheWeekProvider,
  VideoDimensionProvider,
  VideoProvider,
  VideoRemoveProvider,
  VideoUpdateProvider,
} from '@dark-rush-photography/api/data';
import { AdminPhotoOfTheWeekService } from './admin-photo-of-the-week.service';
import { AdminPhotoOfTheWeekController } from './admin-photo-of-the-week.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
  ],
  controllers: [AdminPhotoOfTheWeekController],
  providers: [
    AdminPhotoOfTheWeekService,
    PhotoOfTheWeekProvider,
    EntityProvider,
    EntityUpdateProvider,
    EntityPostProvider,
    EntityDeleteProvider,
    MediaProvider,
    ImageProvider,
    ImageUpdateProvider,
    ImageRemoveProvider,
    ImageDimensionProvider,
    VideoProvider,
    VideoUpdateProvider,
    VideoRemoveProvider,
    VideoDimensionProvider,
  ],
})
export class AdminPhotoOfTheWeekModule {}
