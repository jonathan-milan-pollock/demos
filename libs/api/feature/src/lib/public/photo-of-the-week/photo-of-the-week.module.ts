import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Document,
  DocumentSchema,
  EntityLoadProvider,
  EntityProvider,
} from '@dark-rush-photography/api/data';
import { PhotoOfTheWeekService } from './photo-of-the-week.service';
import { PhotoOfTheWeekController } from './photo-of-the-week.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
  ],
  controllers: [PhotoOfTheWeekController],
  providers: [PhotoOfTheWeekService, EntityProvider, EntityLoadProvider],
})
export class PhotoOfTheWeekModule {}
