import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Document, DocumentSchema } from '@dark-rush-photography/api/data';
import { AdminAboutModule } from './admin-about/admin-about.module';
import { AdminBestOfModule } from './admin-best-of/admin-best-of.module';
import { AdminDestinationsModule } from './admin-destinations/admin-destinations.module';
import { AdminEntityModule } from './admin-entity/admin-entity.module';
import { AdminEventsModule } from './admin-events/admin-events.module';
import { AdminFavoritesModule } from './admin-favorites/admin-favorites.module';
import { AdminImageDimensionsModule } from './admin-image-dimensions/admin-image-dimensions.module';
import { AdminImagesModule } from './admin-images/admin-images.module';
import { AdminMediaProcessModule } from './admin-media-process/admin-media-process.module';
import { AdminPhotoOfTheWeekModule } from './admin-photo-of-the-week/admin-photo-of-the-week.module';
import { AdminReviewMediaModule } from './admin-review-media/admin-review-media.module';
import { AdminReviewsModule } from './admin-reviews/admin-reviews.module';
import { AdminSocialMediaModule } from './admin-social-media/admin-social-media.module';
import { AdminVideoDimensionsModule } from './admin-video-dimensions/admin-video-dimensions.module';
import { AdminVideosModule } from './admin-videos/admin-videos.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
    AdminAboutModule,
    AdminBestOfModule,
    AdminDestinationsModule,
    AdminEntityModule,
    AdminEventsModule,
    AdminFavoritesModule,
    AdminImageDimensionsModule,
    AdminImagesModule,
    AdminMediaProcessModule,
    AdminPhotoOfTheWeekModule,
    AdminReviewMediaModule,
    AdminReviewsModule,
    AdminSocialMediaModule,
    AdminVideoDimensionsModule,
    AdminVideosModule,
  ],
})
export class AdminModule {}
