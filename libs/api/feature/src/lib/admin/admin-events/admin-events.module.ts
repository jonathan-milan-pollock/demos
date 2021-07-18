import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Document,
  DocumentSchema,
  EntityDeleteProvider,
  EntityPostProvider,
  EntityProvider,
  EntityUpdateProvider,
  EventProvider,
  ImageDimensionProvider,
  ImageProvider,
  ImageRemoveProvider,
  ImageUpdateProvider,
  MediaProvider,
  VideoDimensionProvider,
  VideoProvider,
  VideoRemoveProvider,
  VideoUpdateProvider,
} from '@dark-rush-photography/api/data';
import { AdminEventsService } from './admin-events.service';
import { AdminEventsController } from './admin-events.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
  ],
  controllers: [AdminEventsController],
  providers: [
    AdminEventsService,
    EventProvider,
    EntityProvider,
    EntityUpdateProvider,
    EntityPostProvider,
    EntityDeleteProvider,
    MediaProvider,
    ImageProvider,
    ImageUpdateProvider,
    ImageRemoveProvider,
    ImageDimensionProvider,
    VideoProvider,
    VideoUpdateProvider,
    VideoRemoveProvider,
    VideoDimensionProvider,
  ],
})
export class AdminEventsModule {}
