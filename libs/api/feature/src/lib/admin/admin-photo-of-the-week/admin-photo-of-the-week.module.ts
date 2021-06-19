import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Document,
  DocumentSchema,
  PhotoOfTheWeekProvider,
} from '@dark-rush-photography/api/data';
import { AdminPhotoOfTheWeekController } from './admin-photo-of-the-week.controller';
import { AdminPhotoOfTheWeekService } from './admin-photo-of-the-week.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
    HttpModule,
  ],
  controllers: [AdminPhotoOfTheWeekController],
  providers: [PhotoOfTheWeekProvider, AdminPhotoOfTheWeekService],
})
export class AdminPhotoOfTheWeekModule {}
