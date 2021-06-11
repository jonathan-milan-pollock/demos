import { Body, Controller, Post, Req } from '@nestjs/common';
import { AzureRequest } from '@nestjs/azure-func-http';

import { PublishedImage } from '@dark-rush-photography/serverless/types';
import { PostImageService } from './post-image.service';

@Controller('post-image')
export class PostImageController {
  constructor(private readonly postImageService: PostImageService) {}

  @Post()
  async postImage(
    @Req() request: AzureRequest,
    @Body() publishedImage: PublishedImage
  ): Promise<void> {
    request.context.done(
      null,
      await this.postImageService.postImage(request, publishedImage)
    );
  }
}
