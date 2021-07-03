import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Document,
  DocumentSchema,
  EntityProvider,
  ServerlessEntityProvider,
} from '@dark-rush-photography/api/data';
import { AdminEventsService } from './admin-events.service';
import { AdminEventsController } from './admin-events.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
    HttpModule,
  ],
  controllers: [AdminEventsController],
  providers: [AdminEventsService, EntityProvider, ServerlessEntityProvider],
})
export class AdminEventsModule {}
