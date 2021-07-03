import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  ContentProvider,
  Document,
  DocumentSchema,
  ServerlessMediaProvider,
} from '@dark-rush-photography/api/data';
import { AdminVideosService } from './admin-videos.service';
import { AdminVideosController } from './admin-videos.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
    HttpModule,
  ],
  controllers: [AdminVideosController],
  providers: [AdminVideosService, ContentProvider, ServerlessMediaProvider],
})
export class AdminVideosModule {}
