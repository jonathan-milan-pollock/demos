import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Document,
  DocumentSchema,
  EntityDeleteProvider,
  EntityProvider,
  EntityUpdateProvider,
  ImageDimensionProvider,
  ImageProvider,
  ImageRemoveProvider,
  ImageUpdateProvider,
  MediaProcessProvider,
  MediaProvider,
  VideoDimensionProvider,
  VideoProvider,
  VideoRemoveProvider,
  VideoUpdateProvider,
} from '@dark-rush-photography/api/data';
import { AdminMediaProcessesService } from './admin-media-processes.service';
import { AdminMediaProcessesController } from './admin-media-processes.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
  ],
  controllers: [AdminMediaProcessesController],
  providers: [
    AdminMediaProcessesService,
    MediaProcessProvider,
    EntityProvider,
    EntityUpdateProvider,
    EntityDeleteProvider,
    MediaProvider,
    ImageProvider,
    ImageUpdateProvider,
    ImageRemoveProvider,
    ImageDimensionProvider,
    VideoProvider,
    VideoUpdateProvider,
    VideoRemoveProvider,
    VideoDimensionProvider,
  ],
})
export class AdminMediaProcessesModule {}
