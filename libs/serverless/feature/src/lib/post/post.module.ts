import { HttpModule, Module } from '@nestjs/common';

import {
  AzureStorageProvider,
  PostProvider,
} from '@dark-rush-photography/serverless/data';
import { PostService } from './post.service';
import { PostController } from './post.controller';

@Module({
  imports: [HttpModule],
  controllers: [PostController],
  providers: [PostService, PostProvider, AzureStorageProvider],
})
export class PostModule {}
