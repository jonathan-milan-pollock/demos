import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Document,
  DocumentSchema,
  EventProvider,
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
  providers: [EventProvider, AdminEventsService],
})
export class AdminEventsModule {}
