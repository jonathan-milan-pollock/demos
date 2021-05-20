import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Document, DocumentSchema } from '@dark-rush-photography/api/data';
import { AdminDestinationsController } from './admin-destinations/admin-destinations.controller';
import { AdminDestinationsService } from './admin-destinations/admin-destinations.service';
import { AdminEventsController } from './admin-events/admin-events.controller';
import { AdminEventsService } from './admin-events/admin-events.service';
import { AdminImagesController } from './admin-images/admin-images.controller';
import { AdminImagesService } from './admin-images/admin-images.service';
import { AdminPhotoOfTheWeekController } from './admin-photo-of-the-week/admin-photo-of-the-week.controller';
import { AdminPhotoOfTheWeekService } from './admin-photo-of-the-week/admin-photo-of-the-week.service';
import { AdminReviewsController } from './admin-reviews/admin-reviews.controller';
import { AdminReviewsService } from './admin-reviews/admin-reviews.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
  ],
  controllers: [
    AdminDestinationsController,
    AdminEventsController,
    AdminImagesController,
    AdminPhotoOfTheWeekController,
    AdminReviewsController,
  ],
  providers: [
    AdminDestinationsService,
    AdminEventsService,
    AdminImagesService,
    AdminPhotoOfTheWeekService,
    AdminReviewsService,
  ],
  exports: [],
})
export class AdminModule {}
