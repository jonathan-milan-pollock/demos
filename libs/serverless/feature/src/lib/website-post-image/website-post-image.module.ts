import { HttpModule, Module } from '@nestjs/common';

import { WebsitePostImageProvider } from '@dark-rush-photography/serverless/data';
import { WebsitePostImageService } from './website-post-image.service';
import { WebsitePostImageController } from './website-post-image.controller';

@Module({
  imports: [HttpModule],
  controllers: [WebsitePostImageController],
  providers: [WebsitePostImageService, WebsitePostImageProvider],
})
export class WebsitePostImageModule {}
