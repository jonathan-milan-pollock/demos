import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';

import {
  AboutProvider,
  Document,
  DocumentSchema,
  EntityPublicProvider,
} from '@dark-rush-photography/api/data';
import { AboutService } from './about.service';
import { AboutController } from './about.controller';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
  ],
  controllers: [AboutController],
  providers: [AboutService, EntityPublicProvider, AboutProvider],
})
export class AboutModule {}
