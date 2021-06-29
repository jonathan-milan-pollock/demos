import { HttpModule, Module } from '@nestjs/common';

import {
  AzureStorageProvider,
  SocialMediaPostVideoProvider,
} from '@dark-rush-photography/serverless/data';
import { SocialMediaPostVideoService } from './social-media-post-video.service';
import { SocialMediaPostVideoController } from './social-media-post-video.controller';

@Module({
  imports: [HttpModule],
  controllers: [SocialMediaPostVideoController],
  providers: [
    SocialMediaPostVideoService,
    SocialMediaPostVideoProvider,
    AzureStorageProvider,
  ],
})
export class SocialMediaPostVideoModule {}
