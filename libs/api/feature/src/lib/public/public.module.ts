import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Document, DocumentSchema } from '@dark-rush-photography/api/data';
import { AboutModule } from './about/about.module';
import { BestOfModule } from './best-of/best-of.module';
import { DestinationsModule } from './destinations/destinations.module';
import { EventsModule } from './events/events.module';
import { FavoritesModule } from './favorites/favorites.module';
import { ImageDimensionsModule } from './image-dimensions/image-dimensions.module';
import { ImagesModule } from './images/images.module';
import { PhotoOfTheWeekModule } from './photo-of-the-week/photo-of-the-week.module';
import { ReviewModule } from './review/review.module';
import { ReviewsModule } from './reviews/reviews.module';
import { SocialMediaModule } from './social-media/social-media.module';
import { VideoDimensionsModule } from './video-dimensions/video-dimensions.module';
import { VideosModule } from './videos/videos.module';

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
    ImageDimensionsModule,
    ImagesModule,
    PhotoOfTheWeekModule,
    ReviewModule,
    ReviewsModule,
    SocialMediaModule,
    VideoDimensionsModule,
    VideosModule,
  ],
})
export class PublicModule {}
