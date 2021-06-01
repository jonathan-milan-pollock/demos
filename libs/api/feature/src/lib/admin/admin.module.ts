import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Document, DocumentSchema } from '@dark-rush-photography/api/data';
import { AdminBestOfChildrenController } from './admin-best-of-children/admin-best-of-children.controller';
import { AdminBestOfChildrenService } from './admin-best-of-children/admin-best-of-children.service';
import { AdminBestOfEventsController } from './admin-best-of-events/admin-best-of-events.controller';
import { AdminBestOfEventsService } from './admin-best-of-events/admin-best-of-events.service';
import { AdminDestinationsController } from './admin-destinations/admin-destinations.controller';
import { AdminDestinationsService } from './admin-destinations/admin-destinations.service';
import { AdminEventsController } from './admin-events/admin-events.controller';
import { AdminEventsService } from './admin-events/admin-events.service';
import { AdminFavoritesController } from './admin-favorites/admin-favorites.controller';
import { AdminFavoritesService } from './admin-favorites/admin-favorites.service';
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
    AdminBestOfChildrenController,
    AdminBestOfEventsController,
    AdminDestinationsController,
    AdminEventsController,
    AdminFavoritesController,
    AdminPhotoOfTheWeekController,
    AdminReviewsController,
  ],
  providers: [
    AdminBestOfChildrenService,
    AdminBestOfEventsService,
    AdminDestinationsService,
    AdminEventsService,
    AdminFavoritesService,
    AdminPhotoOfTheWeekService,
    AdminReviewsService,
  ],
  exports: [],
})
export class AdminModule {}
