import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Document,
  DocumentSchema,
  EntityProvider,
} from '@dark-rush-photography/api/data';
import { AdminBestOfService } from './admin-best-of.service';
import { AdminBestOfController } from './admin-best-of.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
    HttpModule,
  ],
  controllers: [AdminBestOfController],
  providers: [AdminBestOfService, EntityProvider],
})
export class AdminBestOfModule {}
