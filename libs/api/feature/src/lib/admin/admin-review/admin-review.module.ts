import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Document, DocumentSchema } from '@dark-rush-photography/api/data';
import { AdminReviewController } from './admin-review.controller';
import { AdminReviewService } from './admin-review.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
  ],
  controllers: [AdminReviewController],
  providers: [AdminReviewService],
})
export class AdminReviewModule {}
