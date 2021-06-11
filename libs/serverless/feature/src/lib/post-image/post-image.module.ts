import { Module } from '@nestjs/common';

import { PostImageProcessService } from '@dark-rush-photography/serverless/data';
import { PostImageController } from './post-image.controller';
import { PostImageService } from './post-image.service';

@Module({
  controllers: [PostImageController],
  providers: [PostImageProcessService, PostImageService],
})
export class PostImageModule {}
