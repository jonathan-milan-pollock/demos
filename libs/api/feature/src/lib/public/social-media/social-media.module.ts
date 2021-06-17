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
import { SocialMediaController } from './social-media.controller';
import { SocialMediaService } from './social-media.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
  ],
  controllers: [SocialMediaController],
  providers: [
    SocialMediaProvider,
    ImageProvider,
    ImageDimensionProvider,
    VideoProvider,
    VideoDimensionProvider,
    SocialMediaService,
  ],
})
export class SocialMediaModule {}
