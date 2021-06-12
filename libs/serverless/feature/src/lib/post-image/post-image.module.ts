import { HttpModule, Module } from '@nestjs/common';

import { PostImageActivityProvider } from '@dark-rush-photography/serverless/data';
import { PostImageController } from './post-image.controller';
import { PostImageService } from './post-image.service';

@Module({
  imports: [HttpModule],
  controllers: [PostImageController],
  providers: [PostImageActivityProvider, PostImageService],
})
export class PostImageModule {}
