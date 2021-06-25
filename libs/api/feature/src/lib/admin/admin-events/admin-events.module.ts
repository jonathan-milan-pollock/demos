import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Document,
  DocumentModelProvider,
  DocumentSchema,
  EventProvider,
  ServerlessProvider,
} from '@dark-rush-photography/api/data';
import { AdminEventsController } from './admin-events.controller';
import { AdminEventsService } from './admin-events.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
    HttpModule,
  ],
  controllers: [AdminEventsController],
  providers: [
    ServerlessProvider,
    DocumentModelProvider,
    EventProvider,
    AdminEventsService,
  ],
})
export class AdminEventsModule {}
