import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Document,
  DocumentSchema,
  EntityPublicProvider,
  ImageDimensionProvider,
  ImageProvider,
  ImageRemoveProvider,
  ImageUploadProvider,
  PhotoOfTheWeekProvider,
  ImageResizeProvider,
  ImageTinifyProvider,
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
    EntityPublicProvider,
    PhotoOfTheWeekProvider,
    ImageProvider,
    ImageUploadProvider,
    ImageRemoveProvider,
    ImageDimensionProvider,
    ImageTinifyProvider,
    ImageResizeProvider,
  ],
})
export class PhotoOfTheWeekModule {}
