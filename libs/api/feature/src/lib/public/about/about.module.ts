import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  AboutProvider,
  Document,
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
  providers: [AboutProvider, AboutService],
})
export class AboutModule {}
