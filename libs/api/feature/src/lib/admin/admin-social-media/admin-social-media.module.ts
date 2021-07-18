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
  MediaProvider,
  SocialMediaProvider,
  VideoDimensionProvider,
  VideoProvider,
  VideoRemoveProvider,
  VideoUpdateProvider,
} from '@dark-rush-photography/api/data';
import { AdminSocialMediaService } from './admin-social-media.service';
import { AdminSocialMediaController } from './admin-social-media.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
  ],
  controllers: [AdminSocialMediaController],
  providers: [
    AdminSocialMediaService,
    SocialMediaProvider,
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
export class AdminSocialMediaModule {}
