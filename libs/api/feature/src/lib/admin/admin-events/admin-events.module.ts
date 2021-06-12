import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Document,
  DocumentModelProvider,
  DocumentSchema,
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
  providers: [DocumentModelProvider, AdminEventsService],
})
export class AdminEventsModule {}
