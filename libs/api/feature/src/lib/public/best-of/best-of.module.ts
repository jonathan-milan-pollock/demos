import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Document,
  DocumentSchema,
  EntityLoadProvider,
  EntityProvider,
} from '@dark-rush-photography/api/data';
import { BestOfService } from './best-of.service';
import { BestOfController } from './best-of.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
  ],
  controllers: [BestOfController],
  providers: [BestOfService, EntityProvider, EntityLoadProvider],
})
export class BestOfModule {}
