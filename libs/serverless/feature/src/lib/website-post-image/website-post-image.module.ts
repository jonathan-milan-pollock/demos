import { HttpModule, Module } from '@nestjs/common';

import { WebsitePostImageActivityProvider } from '@dark-rush-photography/serverless/data';
import { WebsitePostImageController } from './website-post-image.controller';
import { WebsitePostImageService } from './website-post-image.service';

@Module({
  imports: [HttpModule],
  controllers: [WebsitePostImageController],
  providers: [WebsitePostImageActivityProvider, WebsitePostImageService],
})
export class WebsitePostImageModule {}
