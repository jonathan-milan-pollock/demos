import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Document,
  DocumentSchema,
  EntityCreateProvider,
  EntityGroupProvider,
  EntityProvider,
  EntityPublishProvider,
  EntitySocialMediaPostProvider,
  ImageDimensionProvider,
  ImageProvider,
  ImagePublishProvider,
  ImageRemoveProvider,
  ImageResizeProvider,
  ImageTinifyProvider,
  ImageUpdateProvider,
  VideoProvider,
  VideoRemoveProvider,
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
    EntityGroupProvider,
    EntityCreateProvider,
    EntityPublishProvider,
    EntitySocialMediaPostProvider,
    ImageProvider,
    ImageDimensionProvider,
    ImagePublishProvider,
    ImageUpdateProvider,
    ImageRemoveProvider,
    ImageTinifyProvider,
    ImageResizeProvider,
    VideoProvider,
    VideoRemoveProvider,
  ],
})
export class AdminEntitiesModule {}
