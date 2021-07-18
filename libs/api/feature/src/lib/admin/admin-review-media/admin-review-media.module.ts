import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Document,
  DocumentSchema,
  EntityDeleteProvider,
  EntityProvider,
  ImageProvider,
  ImageRemoveProvider,
  MediaProvider,
  ReviewMediaProvider,
  VideoProvider,
  VideoRemoveProvider,
} from '@dark-rush-photography/api/data';
import { AdminReviewMediaService } from './admin-review-media.service';
import { AdminReviewMediaController } from './admin-review-media.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
  ],
  controllers: [AdminReviewMediaController],
  providers: [
    AdminReviewMediaService,
    ReviewMediaProvider,
    EntityProvider,
    EntityDeleteProvider,
    MediaProvider,
    ImageProvider,
    ImageRemoveProvider,
    VideoProvider,
    VideoRemoveProvider,
  ],
})
export class AdminReviewMediaModule {}
