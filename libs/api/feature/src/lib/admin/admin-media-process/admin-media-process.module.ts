import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Document,
  DocumentModelProvider,
  DocumentSchema,
  MediaProcessProvider,
  ServerlessProvider,
} from '@dark-rush-photography/api/data';
import { AdminMediaProcessService } from './admin-media-process.service';
import { AdminMediaProcessController } from './admin-media-process.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
    HttpModule,
  ],
  controllers: [AdminMediaProcessController],
  providers: [
    AdminMediaProcessService,
    MediaProcessProvider,
    DocumentModelProvider,
    ServerlessProvider,
  ],
})
export class AdminMediaProcessModule {}
