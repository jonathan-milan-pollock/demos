import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  DestinationProvider,
  Document,
  DocumentSchema,
} from '@dark-rush-photography/api/data';
import { DestinationsController } from './destinations.controller';
import { DestinationsService } from './destinations.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
  ],
  controllers: [DestinationsController],
  providers: [DestinationProvider, DestinationsService],
})
export class DestinationsModule {}
