import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Document,
  DocumentSchema,
  EntityProvider,
  GoogleDriveWebsitesProvider,
  ImageDimensionProvider,
  ImageProvider,
  ImageRemoveProvider,
  ImageUploadProvider,
  ReviewMediaProvider,
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
    EntityProvider,
    ReviewMediaProvider,
    ImageProvider,
    ImageUploadProvider,
    ImageRemoveProvider,
    ImageDimensionProvider,
    GoogleDriveWebsitesProvider,
  ],
})
export class ReviewMediaModule {}
