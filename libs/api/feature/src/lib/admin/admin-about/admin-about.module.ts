import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  AboutProvider,
  Document,
  DocumentSchema,
  EntityDeleteProvider,
  EntityProvider,
  EntityUpdateProvider,
  ImageDimensionProvider,
  ImageProvider,
  ImageRemoveProvider,
  ImageUpdateProvider,
  MediaProvider,
  VideoDimensionProvider,
  VideoProvider,
  VideoRemoveProvider,
  VideoUpdateProvider,
} from '@dark-rush-photography/api/data';
import { AdminAboutService } from './admin-about.service';
import { AdminAboutController } from './admin-about.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
  ],
  controllers: [AdminAboutController],
  providers: [
    AdminAboutService,
    AboutProvider,
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
export class AdminAboutModule {}
