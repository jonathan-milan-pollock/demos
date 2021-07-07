import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Document,
  DocumentSchema,
  EntityProvider,
} from '@dark-rush-photography/api/data';
import { AdminAboutService } from './admin-about.service';
import { AdminAboutController } from './admin-about.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
    HttpModule,
  ],
  controllers: [AdminAboutController],
  providers: [AdminAboutService, EntityProvider],
})
export class AdminAboutModule {}
