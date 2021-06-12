import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Document,
  DocumentModelProvider,
  DocumentSchema,
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
  providers: [DocumentModelProvider, AdminPhotoOfTheWeekService],
})
export class AdminPhotoOfTheWeekModule {}
