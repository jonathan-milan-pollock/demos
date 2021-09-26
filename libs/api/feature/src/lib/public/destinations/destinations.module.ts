import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Document,
  DocumentSchema,
  EntityFindAllPublicProvider,
  EntityFindOnePublicProvider,
} from '@dark-rush-photography/api/data';
import { DestinationsService } from './destinations.service';
import { DestinationsController } from './destinations.controller';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
  ],
  controllers: [DestinationsController],
  providers: [
    DestinationsService,
    EntityFindAllPublicProvider,
    EntityFindOnePublicProvider,
  ],
})
export class DestinationsModule {}
