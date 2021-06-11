import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ImageStateProvider } from '@dark-rush-photography/api/util';
import {
  Document,
  DocumentModelService,
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
  providers: [ImageStateProvider, DocumentModelService, AdminBestOfService],
})
export class AdminBestOfModule {}
