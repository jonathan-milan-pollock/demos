import { Module } from '@nestjs/common';

import { SocialMediaPostImageProcessService } from '@dark-rush-photography/serverless/data';
import { SocialMediaPostImageController } from './social-media-post-image.controller';
import { SocialMediaPostImageService } from './social-media-post-image.service';

@Module({
  controllers: [SocialMediaPostImageController],
  providers: [SocialMediaPostImageProcessService, SocialMediaPostImageService],
})
export class SocialMediaPostImageModule {}
