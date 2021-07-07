import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Document,
  DocumentSchema,
  EntityProvider,
} from '@dark-rush-photography/api/data';
import { AdminPhotoOfTheWeekService } from './admin-photo-of-the-week.service';
import { AdminPhotoOfTheWeekController } from './admin-photo-of-the-week.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
    HttpModule,
  ],
  controllers: [AdminPhotoOfTheWeekController],
  providers: [AdminPhotoOfTheWeekService, EntityProvider],
})
export class AdminPhotoOfTheWeekModule {}
