import { HttpModule, Module } from '@nestjs/common';

import {
  AzureStorageProvider,
  PostVideoProvider,
} from '@dark-rush-photography/serverless/data';
import { PostVideoService } from './post-video.service';
import { PostVideoController } from './post-video.controller';

@Module({
  imports: [HttpModule],
  controllers: [PostVideoController],
  providers: [PostVideoService, PostVideoProvider, AzureStorageProvider],
})
export class PostVideoModule {}
