import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  DestinationProvider,
  Document,
  DocumentSchema,
  EntityProvider,
} from '@dark-rush-photography/api/data';
import { DestinationsService } from './destinations.service';
import { DestinationsController } from './destinations.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
  ],
  controllers: [DestinationsController],
  providers: [DestinationsService, DestinationProvider, EntityProvider],
})
export class DestinationsModule {}
