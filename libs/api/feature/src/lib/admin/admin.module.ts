import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Document, DocumentSchema } from '@dark-rush-photography/api/data';
import { AdminBestOfModule } from './admin-best-of/admin-best-of.module';
import { AdminDestinationsModule } from './admin-destinations/admin-destinations.module';
import { AdminEventsModule } from './admin-events/admin-events.module';
import { AdminFavoritesModule } from './admin-favorites/admin-favorites.module';
import { AdminPhotoOfTheWeekModule } from './admin-photo-of-the-week/admin-photo-of-the-week.module';
import { AdminReviewsModule } from './admin-reviews/admin-reviews.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
    AdminBestOfModule,
    AdminDestinationsModule,
    AdminEventsModule,
    AdminFavoritesModule,
    AdminPhotoOfTheWeekModule,
    AdminReviewsModule,
  ],
})
export class AdminModule {}
