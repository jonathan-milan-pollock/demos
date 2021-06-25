import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  BestOfProvider,
  Document,
  DocumentModelProvider,
  DocumentSchema,
} from '@dark-rush-photography/api/data';
import { AdminBestOfController } from './admin-best-of.controller';
import { AdminBestOfService } from './admin-best-of.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
  ],
  controllers: [AdminBestOfController],
  providers: [DocumentModelProvider, BestOfProvider, AdminBestOfService],
})
export class AdminBestOfModule {}
