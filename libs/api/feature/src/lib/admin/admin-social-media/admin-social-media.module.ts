import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Document,
  DocumentSchema,
  ImageDimensionProvider,
  ImageProvider,
  SocialMediaProvider,
  VideoDimensionProvider,
  VideoProvider,
} from '@dark-rush-photography/api/data';
import { AdminSocialMediaController } from './admin-social-media.controller';
import { AdminSocialMediaService } from './admin-social-media.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
  ],
  controllers: [AdminSocialMediaController],
  providers: [
    SocialMediaProvider,
    ImageProvider,
    ImageDimensionProvider,
    VideoProvider,
    VideoDimensionProvider,
    AdminSocialMediaService,
  ],
})
export class AdminSocialMediaModule {}
