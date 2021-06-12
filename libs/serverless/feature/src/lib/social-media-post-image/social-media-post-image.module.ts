import { HttpModule, Module } from '@nestjs/common';

import { SocialMediaPostImageActivityProvider } from '@dark-rush-photography/serverless/data';
import { SocialMediaPostImageController } from './social-media-post-image.controller';
import { SocialMediaPostImageService } from './social-media-post-image.service';

@Module({
  imports: [HttpModule],
  controllers: [SocialMediaPostImageController],
  providers: [
    SocialMediaPostImageActivityProvider,
    SocialMediaPostImageService,
  ],
})
export class SocialMediaPostImageModule {}
