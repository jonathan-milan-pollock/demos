import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  AboutProvider,
  Document,
  DocumentModelProvider,
  DocumentSchema,
} from '@dark-rush-photography/api/data';
import { AdminAboutController } from './admin-about.controller';
import { AdminAboutService } from './admin-about.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
  ],
  controllers: [AdminAboutController],
  providers: [DocumentModelProvider, AboutProvider, AdminAboutService],
})
export class AdminAboutModule {}
