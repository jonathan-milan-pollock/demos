import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  CommentProvider,
  Document,
  DocumentSchema,
  EmotionProvider,
  ImageDimensionProvider,
  ImageProvider,
  PhotoOfTheWeekProvider,
} from '@dark-rush-photography/api/data';
import { AdminPhotoOfTheWeekController } from './admin-photo-of-the-week.controller';
import { AdminPhotoOfTheWeekService } from './admin-photo-of-the-week.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
  ],
  controllers: [AdminPhotoOfTheWeekController],
  providers: [
    PhotoOfTheWeekProvider,
    ImageProvider,
    ImageDimensionProvider,
    CommentProvider,
    EmotionProvider,
    AdminPhotoOfTheWeekService,
  ],
})
export class AdminPhotoOfTheWeekModule {}
