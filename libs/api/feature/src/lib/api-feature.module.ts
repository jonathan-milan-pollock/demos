import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  ReviewDocument,
  ReviewSchema,
  PhotoOfTheWeekDocument,
  PhotoOfTheWeekSchema,
  DestinationDocument,
  DestinationSchema,
  EventDocument,
  EventSchema,
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
      { name: ReviewDocument.name, schema: ReviewSchema },
      { name: PhotoOfTheWeekDocument.name, schema: PhotoOfTheWeekSchema },
      { name: EventDocument.name, schema: EventSchema },
      { name: DestinationDocument.name, schema: DestinationSchema },
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
