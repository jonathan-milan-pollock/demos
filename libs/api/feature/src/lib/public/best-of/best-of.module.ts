import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  BestOfTypeProvider,
  Document,
  DocumentModelProvider,
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
  providers: [DocumentModelProvider, BestOfTypeProvider, BestOfService],
})
export class BestOfModule {}
