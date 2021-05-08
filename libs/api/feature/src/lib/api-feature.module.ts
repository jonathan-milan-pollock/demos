import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Document,
  DocumentSchema,
} from '@dark-rush-photography/shared-server/data';
import { ReviewsService } from './reviews/reviews.service';
import { ReviewsController } from './reviews/reviews.controller';
import { PhotoOfTheWeekService } from './photo-of-the-week/photo-of-the-week.service';
import { PhotoOfTheWeekController } from './photo-of-the-week/photo-of-the-week.controller';
import { EventsService } from './events/events.service';
import { EventsController } from './events/events.controller';
import { DestinationsService } from './destinations/destinations.service';
import { DestinationsController } from './destinations/destinations.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
  ],
  controllers: [
    ReviewsController,
    PhotoOfTheWeekController,
    EventsController,
    DestinationsController,
  ],
  providers: [
    ReviewsService,
    PhotoOfTheWeekService,
    EventsService,
    DestinationsService,
  ],
  exports: [],
})
export class ApiFeatureModule {}
