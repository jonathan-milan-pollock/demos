import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  CommentProvider,
  DestinationProvider,
  Document,
  DocumentSchema,
  EmotionProvider,
  ImageDimensionProvider,
  ImageProvider,
  VideoDimensionProvider,
  VideoProvider,
} from '@dark-rush-photography/api/data';
import { AdminDestinationsController } from './admin-destinations.controller';
import { AdminDestinationsService } from './admin-destinations.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
  ],
  controllers: [AdminDestinationsController],
  providers: [
    DestinationProvider,
    ImageProvider,
    ImageDimensionProvider,
    VideoProvider,
    VideoDimensionProvider,
    CommentProvider,
    EmotionProvider,
    AdminDestinationsService,
  ],
})
export class AdminDestinationsModule {}
