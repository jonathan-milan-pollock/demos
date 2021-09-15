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
  ReviewMediaProvider,
  ImageTinifyProvider,
} from '@dark-rush-photography/api/data';
import { ReviewMediaService } from './review-media.service';
import { ReviewMediaController } from './review-media.controller';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
  ],
  controllers: [ReviewMediaController],
  providers: [
    ReviewMediaService,
    EntityPublicProvider,
    ReviewMediaProvider,
    ImageProvider,
    ImageUploadProvider,
    ImageRemoveProvider,
    ImageDimensionProvider,
    ImageTinifyProvider,
    ImageResizeProvider,
  ],
})
export class ReviewMediaModule {}
