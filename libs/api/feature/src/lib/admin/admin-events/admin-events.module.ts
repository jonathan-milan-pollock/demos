import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  CommentProvider,
  Document,
  DocumentSchema,
  EmotionProvider,
  EventProvider,
  ImageDimensionProvider,
  ImageProvider,
  VideoDimensionProvider,
  VideoProvider,
} from '@dark-rush-photography/api/data';
import { AdminEventsController } from './admin-events.controller';
import { AdminEventsService } from './admin-events.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
  ],
  controllers: [AdminEventsController],
  providers: [
    EventProvider,
    ImageProvider,
    ImageDimensionProvider,
    VideoProvider,
    VideoDimensionProvider,
    CommentProvider,
    EmotionProvider,
    AdminEventsService,
  ],
})
export class AdminEventsModule {}
