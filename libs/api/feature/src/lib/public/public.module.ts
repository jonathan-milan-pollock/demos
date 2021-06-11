import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Document, DocumentSchema } from '@dark-rush-photography/api/data';
import { BestOfModule } from './best-of/best-of.module';
import { DestinationsModule } from './destinations/destinations.module';
import { EventsModule } from './events/events.module';
import { PhotoOfTheWeekModule } from './photo-of-the-week/photo-of-the-week.module';
import { ReviewsModule } from './reviews/reviews.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
    BestOfModule,
    DestinationsModule,
    EventsModule,
    PhotoOfTheWeekModule,
    ReviewsModule,
  ],
})
export class PublicModule {}
