import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  BestOfProvider,
  Document,
  DocumentSchema,
  EntityDeleteProvider,
  EntityProvider,
  ImageProvider,
  ImageRemoveProvider,
  MediaProvider,
  VideoProvider,
  VideoRemoveProvider,
} from '@dark-rush-photography/api/data';
import { AdminBestOfService } from './admin-best-of.service';
import { AdminBestOfController } from './admin-best-of.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
  ],
  controllers: [AdminBestOfController],
  providers: [
    AdminBestOfService,
    BestOfProvider,
    EntityProvider,
    EntityDeleteProvider,
    MediaProvider,
    ImageProvider,
    ImageRemoveProvider,
    VideoProvider,
    VideoRemoveProvider,
  ],
})
export class AdminBestOfModule {}
