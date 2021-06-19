import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Document, DocumentSchema } from '@dark-rush-photography/api/data';
import { AboutModule } from './about/about.module';
import { BestOfModule } from './best-of/best-of.module';
import { DestinationsModule } from './destinations/destinations.module';
import { EventsModule } from './events/events.module';
import { FavoritesModule } from './favorites/favorites.module';
import { PhotoOfTheWeekModule } from './photo-of-the-week/photo-of-the-week.module';
import { ReviewMediaModule } from './review-media/review-media.module';
import { ReviewsModule } from './reviews/reviews.module';
import { SocialMediaModule } from './social-media/social-media.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
    AboutModule,
    BestOfModule,
    DestinationsModule,
    EventsModule,
    FavoritesModule,
    PhotoOfTheWeekModule,
    ReviewMediaModule,
    ReviewsModule,
    SocialMediaModule,
  ],
})
export class PublicModule {}
