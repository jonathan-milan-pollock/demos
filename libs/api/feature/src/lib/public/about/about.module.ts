import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Document,
  DocumentModelProvider,
  DocumentSchema,
} from '@dark-rush-photography/api/data';
import { AboutController } from './about.controller';
import { AboutService } from './about.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
  ],
  controllers: [AboutController],
  providers: [DocumentModelProvider, AboutService],
})
export class AboutModule {}
