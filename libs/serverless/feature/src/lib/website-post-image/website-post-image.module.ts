import { Module } from '@nestjs/common';

import { WebsitePostImageProcessService } from '@dark-rush-photography/serverless/data';
import { WebsitePostImageController } from './website-post-image.controller';
import { WebsitePostImageService } from './website-post-image.service';

@Module({
  controllers: [WebsitePostImageController],
  providers: [WebsitePostImageProcessService, WebsitePostImageService],
})
export class WebsitePostImageModule {}
