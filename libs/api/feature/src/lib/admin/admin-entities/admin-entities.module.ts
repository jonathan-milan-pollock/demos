import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Document,
  DocumentSchema,
  EntityDeleteProvider,
  EntityPostProvider,
  EntityProvider,
  EntityUpdateProvider,
  ImageDimensionProvider,
  ImageProvider,
  ImageRemoveProvider,
  ImageUpdateProvider,
  VideoDimensionProvider,
  VideoProvider,
  VideoRemoveProvider,
  VideoUpdateProvider,
} from '@dark-rush-photography/api/data';
import { AdminEntitiesService } from './admin-entities.service';
import { AdminEntitiesController } from './admin-entities.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
  ],
  controllers: [AdminEntitiesController],
  providers: [
    AdminEntitiesService,
    EntityProvider,
    EntityUpdateProvider,
    EntityPostProvider,
    EntityDeleteProvider,
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
export class AdminEntitiesModule {}
