import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Document, DocumentSchema } from '@dark-rush-photography/api/data';
import { AdminAboutModule } from './admin-about/admin-about.module';
import { AdminBestOfModule } from './admin-best-of/admin-best-of.module';
import { AdminDestinationsModule } from './admin-destinations/admin-destinations.module';
import { AdminEventsModule } from './admin-events/admin-events.module';
import { AdminFavoritesModule } from './admin-favorites/admin-favorites.module';
import { AdminImageDimensionDataModule } from './admin-image-dimension-data/admin-image-dimension-data.module';
import { AdminImagesModule } from './admin-images/admin-images.module';
import { AdminPhotoOfTheWeekModule } from './admin-photo-of-the-week/admin-photo-of-the-week.module';
import { AdminReviewsModule } from './admin-reviews/admin-reviews.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
    AdminAboutModule,
    AdminBestOfModule,
    AdminDestinationsModule,
    AdminEventsModule,
    AdminFavoritesModule,
    AdminImageDimensionDataModule,
    AdminImagesModule,
    AdminPhotoOfTheWeekModule,
    AdminReviewsModule,
  ],
})
export class AdminModule {}
