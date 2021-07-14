import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Document,
  DocumentSchema,
  EntityProvider,
} from '@dark-rush-photography/api/data';
import { AdminReviewsService } from './admin-reviews.service';
import { AdminReviewsController } from './admin-reviews.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
  ],
  controllers: [AdminReviewsController],
  providers: [AdminReviewsService, EntityProvider],
})
export class AdminReviewsModule {}
