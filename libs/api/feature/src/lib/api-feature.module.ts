import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Document, DocumentSchema } from '@dark-rush-photography/api/data';
import { ReviewsService } from './reviews/reviews.service';
import { ReviewsController } from './reviews/reviews.controller';
import { PhotoOfTheWeekService } from './photo-of-the-week/photo-of-the-week.service';
import { PhotoOfTheWeekController } from './photo-of-the-week/photo-of-the-week.controller';
import { EventsService } from './events/events.service';
import { EventsController } from './events/events.controller';
import { DestinationsService } from './destinations/destinations.service';
import { DestinationsController } from './destinations/destinations.controller';
import { ImagesService } from './images/images.service';
import { ImagesController } from './images/images.controller';

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
    ImagesController,
  ],
  providers: [
    ReviewsService,
    PhotoOfTheWeekService,
    EventsService,
    DestinationsService,
    ImagesService,
  ],
  exports: [],
})
export class ApiFeatureModule {}
