import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  ContentProvider,
  Document,
  DocumentSchema,
  ServerlessMediaProvider,
} from '@dark-rush-photography/api/data';
import { AdminVideoDimensionsService } from './admin-video-dimensions.service';
import { AdminVideoDimensionsController } from './admin-video-dimensions.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
    HttpModule,
  ],
  controllers: [AdminVideoDimensionsController],
  providers: [
    AdminVideoDimensionsService,
    ContentProvider,
    ServerlessMediaProvider,
  ],
})
export class AdminVideoDimensionsModule {}
