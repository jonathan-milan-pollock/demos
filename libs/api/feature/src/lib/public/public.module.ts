import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Document, DocumentSchema } from '@dark-rush-photography/api/data';
import { DestinationsController } from './destinations/destinations.controller';
import { DestinationsService } from './destinations/destinations.service';
import { EventsController } from './events/events.controller';
import { EventsService } from './events/events.service';
import { PhotoOfTheWeekController } from './photo-of-the-week/photo-of-the-week.controller';
import { PhotoOfTheWeekService } from './photo-of-the-week/photo-of-the-week.service';
import { ReviewsController } from './reviews/reviews.controller';
import { ReviewsService } from './reviews/reviews.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
  ],
  controllers: [
    DestinationsController,
    EventsController,
    PhotoOfTheWeekController,
    ReviewsController,
  ],
  providers: [
    DestinationsService,
    EventsService,
    PhotoOfTheWeekService,
    ReviewsService,
  ],
  exports: [],
})
export class PublicModule {}
