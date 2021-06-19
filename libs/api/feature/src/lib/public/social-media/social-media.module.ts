import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Document,
  DocumentSchema,
  SocialMediaProvider,
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
  providers: [SocialMediaProvider, SocialMediaService],
})
export class SocialMediaModule {}
