import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Document,
  DocumentSchema,
  EntityProvider,
  ServerlessEntityProvider,
} from '@dark-rush-photography/api/data';
import { PhotoOfTheWeekService } from './photo-of-the-week.service';
import { PhotoOfTheWeekController } from './photo-of-the-week.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
    HttpModule,
  ],
  controllers: [PhotoOfTheWeekController],
  providers: [PhotoOfTheWeekService, EntityProvider, ServerlessEntityProvider],
})
export class PhotoOfTheWeekModule {}
