import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Document,
  DocumentSchema,
  EntityLoadProvider,
  EntityProvider,
} from '@dark-rush-photography/api/data';
import { AboutService } from './about.service';
import { AboutController } from './about.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
  ],
  controllers: [AboutController],
  providers: [AboutService, EntityProvider, EntityLoadProvider],
})
export class AboutModule {}
