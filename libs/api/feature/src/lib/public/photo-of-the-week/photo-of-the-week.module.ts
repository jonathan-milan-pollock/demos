import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Document,
  DocumentModelService,
  DocumentSchema,
} from '@dark-rush-photography/api/data';
import { PhotoOfTheWeekController } from './photo-of-the-week.controller';
import { PhotoOfTheWeekService } from './photo-of-the-week.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
  ],
  controllers: [PhotoOfTheWeekController],
  providers: [DocumentModelService, PhotoOfTheWeekService],
})
export class PhotoOfTheWeekModule {}
