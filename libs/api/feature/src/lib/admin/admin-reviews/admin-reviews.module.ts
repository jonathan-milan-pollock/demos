import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Document,
  DocumentModelProvider,
  DocumentSchema,
  ReviewProvider,
  ServerlessProvider,
} from '@dark-rush-photography/api/data';
import { AdminReviewsController } from './admin-reviews.controller';
import { AdminReviewsService } from './admin-reviews.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
    HttpModule,
  ],
  controllers: [AdminReviewsController],
  providers: [
    ServerlessProvider,
    DocumentModelProvider,
    ReviewProvider,
    AdminReviewsService,
  ],
})
export class AdminReviewsModule {}
