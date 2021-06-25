import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Document,
  DocumentModelProvider,
  DocumentSchema,
  ReviewMediaProvider,
} from '@dark-rush-photography/api/data';
import { AdminReviewMediaController } from './admin-review-media.controller';
import { AdminReviewMediaService } from './admin-review-media.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
  ],
  controllers: [AdminReviewMediaController],
  providers: [
    DocumentModelProvider,
    ReviewMediaProvider,
    AdminReviewMediaService,
  ],
})
export class AdminReviewMediaModule {}
