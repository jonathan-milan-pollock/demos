import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Document,
  DocumentSchema,
  EntityProvider,
  VideoProvider,
  VideoDimensionProvider,
  VideoRemoveProvider,
  VideoUpdateProvider,
  VideoUploadProvider,
} from '@dark-rush-photography/api/data';
import { AdminVideosService } from './admin-videos.service';
import { AdminVideosController } from './admin-videos.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
  ],
  controllers: [AdminVideosController],
  providers: [
    AdminVideosService,
    EntityProvider,
    VideoProvider,
    VideoDimensionProvider,
    VideoUploadProvider,
    VideoUpdateProvider,
    VideoRemoveProvider,
  ],
})
export class AdminVideosModule {}
