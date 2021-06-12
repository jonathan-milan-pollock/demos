import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Document,
  DocumentModelProvider,
  DocumentSchema,
} from '@dark-rush-photography/api/data';
import { AdminReviewsController } from './admin-reviews.controller';
import { AdminReviewsService } from './admin-reviews.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
  ],
  controllers: [AdminReviewsController],
  providers: [DocumentModelProvider, AdminReviewsService],
})
export class AdminReviewsModule {}
