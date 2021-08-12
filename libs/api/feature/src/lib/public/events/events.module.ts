import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Document,
  DocumentSchema,
  EntityLoadProvider,
  EntityProvider,
} from '@dark-rush-photography/api/data';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
  ],
  controllers: [EventsController],
  providers: [EventsService, EntityProvider, EntityLoadProvider],
})
export class EventsModule {}
