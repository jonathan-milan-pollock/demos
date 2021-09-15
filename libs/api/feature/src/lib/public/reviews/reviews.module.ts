import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Document,
  DocumentSchema,
  EntityPublicProvider,
  ImageDimensionProvider,
  ImageProvider,
  ImageRemoveProvider,
  ImageUploadProvider,
  ImageResizeProvider,
  ReviewProvider,
  ImageTinifyProvider,
} from '@dark-rush-photography/api/data';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
  ],
  controllers: [ReviewsController],
  providers: [
    ReviewsService,
    EntityPublicProvider,
    ReviewProvider,
    ImageProvider,
    ImageUploadProvider,
    ImageRemoveProvider,
    ImageDimensionProvider,
    ImageTinifyProvider,
    ImageResizeProvider,
  ],
})
export class ReviewsModule {}
