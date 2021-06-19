import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Document,
  DocumentSchema,
  SocialMediaProvider,
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
  providers: [SocialMediaProvider, AdminSocialMediaService],
})
export class AdminSocialMediaModule {}
