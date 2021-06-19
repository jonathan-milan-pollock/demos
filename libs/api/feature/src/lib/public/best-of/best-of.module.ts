import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  BestOfProvider,
  Document,
  DocumentSchema,
} from '@dark-rush-photography/api/data';
import { BestOfController } from './best-of.controller';
import { BestOfService } from './best-of.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
  ],
  controllers: [BestOfController],
  providers: [BestOfProvider, BestOfService],
})
export class BestOfModule {}
