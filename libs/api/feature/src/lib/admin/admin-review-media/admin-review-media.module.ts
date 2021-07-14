import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Document,
  DocumentSchema,
  EntityProvider,
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
  providers: [AdminReviewMediaService, EntityProvider],
})
export class AdminReviewMediaModule {}
