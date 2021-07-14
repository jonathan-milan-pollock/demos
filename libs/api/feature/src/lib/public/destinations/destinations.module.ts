import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
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
  providers: [DestinationsService, EntityProvider],
})
export class DestinationsModule {}
