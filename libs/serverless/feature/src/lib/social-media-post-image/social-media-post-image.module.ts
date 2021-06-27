import { HttpModule, Module } from '@nestjs/common';

import { SocialMediaPostImageProvider } from '@dark-rush-photography/serverless/data';
import { SocialMediaPostImageController } from './social-media-post-image.controller';
import { SocialMediaPostImageService } from './social-media-post-image.service';

@Module({
  imports: [HttpModule],
  controllers: [SocialMediaPostImageController],
  providers: [SocialMediaPostImageProvider, SocialMediaPostImageService],
})
export class SocialMediaPostImageModule {}
