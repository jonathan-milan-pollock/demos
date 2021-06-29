import { HttpModule, Module } from '@nestjs/common';

import {
  AzureStorageProvider,
  PostVideoDimensionProvider,
} from '@dark-rush-photography/serverless/data';
import { PostVideoDimensionService } from './post-video-dimension.service';
import { PostVideoDimensionController } from './post-video-dimension.controller';

@Module({
  imports: [HttpModule],
  controllers: [PostVideoDimensionController],
  providers: [
    PostVideoDimensionService,
    PostVideoDimensionProvider,
    AzureStorageProvider,
  ],
})
export class PostVideoDimensionModule {}
