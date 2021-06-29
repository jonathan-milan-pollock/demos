import { HttpModule, Module } from '@nestjs/common';

import {
  AzureStorageProvider,
  PostImageDimensionProvider,
} from '@dark-rush-photography/serverless/data';
import { PostImageDimensionService } from './post-image-dimension.service';
import { PostImageController } from './post-image-dimension.controller';

@Module({
  imports: [HttpModule],
  controllers: [PostImageController],
  providers: [
    PostImageDimensionService,
    PostImageDimensionProvider,
    AzureStorageProvider,
  ],
})
export class PostImageDimensionModule {}
