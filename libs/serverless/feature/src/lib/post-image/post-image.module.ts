import { HttpModule, Module } from '@nestjs/common';

import {
  AzureStorageProvider,
  PostImageProvider,
} from '@dark-rush-photography/serverless/data';
import { PostImageController } from './post-image.controller';
import { PostImageService } from './post-image.service';

@Module({
  imports: [HttpModule],
  controllers: [PostImageController],
  providers: [PostImageService, PostImageProvider, AzureStorageProvider],
})
export class PostImageModule {}
