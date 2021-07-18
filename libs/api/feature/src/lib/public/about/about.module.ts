import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  AboutProvider,
  Document,
  DocumentSchema,
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
  providers: [AboutService, AboutProvider, EntityProvider],
})
export class AboutModule {}
