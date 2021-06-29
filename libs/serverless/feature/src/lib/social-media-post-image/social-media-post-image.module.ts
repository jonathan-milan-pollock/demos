import { HttpModule, Module } from '@nestjs/common';

import {
  AzureStorageProvider,
  SocialMediaPostImageProvider,
} from '@dark-rush-photography/serverless/data';
import { SocialMediaPostImageService } from './social-media-post-image.service';
import { SocialMediaPostImageController } from './social-media-post-image.controller';

@Module({
  imports: [HttpModule],
  controllers: [SocialMediaPostImageController],
  providers: [
    SocialMediaPostImageService,
    SocialMediaPostImageProvider,
    AzureStorageProvider,
  ],
})
export class SocialMediaPostImageModule {}
