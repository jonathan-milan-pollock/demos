import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Document, DocumentSchema } from '@dark-rush-photography/api/data';
import { AboutModule } from './about/about.module';
import { BestOfModule } from './best-of/best-of.module';
import { DestinationsModule } from './destinations/destinations.module';
import { DropboxModule } from './dropbox/dropbox.module';
import { EventsModule } from './events/events.module';
import { FavoritesModule } from './favorites/favorites.module';
import { ImagesModule } from './images/images.module';
import { PhotoOfTheWeekModule } from './photo-of-the-week/photo-of-the-week.module';
import { ReviewMediaModule } from './review-media/review-media.module';
import { ReviewsModule } from './reviews/reviews.module';
import { SitemapModule } from './sitemap/sitemap.module';
import { VideosModule } from './videos/videos.module';

@Module({
  imports: [
        //TODO: Don't believe this is needed
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
    AboutModule,
    BestOfModule,
    DestinationsModule,
    DropboxModule,
    EventsModule,
    FavoritesModule,
    ImagesModule,
    PhotoOfTheWeekModule,
    ReviewMediaModule,
    ReviewsModule,
    SitemapModule,
    VideosModule,
  ],
})
export class PublicModule {}
