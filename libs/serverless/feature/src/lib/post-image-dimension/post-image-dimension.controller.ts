import { Body, Controller, Post, Req } from '@nestjs/common';
import { AzureRequest } from '@nestjs/azure-func-http';

import { Activity } from '@dark-rush-photography/serverless/types';
import { PostImageDimensionService } from './post-image-dimension.service';

@Controller('post-image-dimension')
export class PostImageController {
  constructor(
    private readonly postImageDimensionService: PostImageDimensionService
  ) {}

  @Post()
  async postImageDimension(
    @Req() request: AzureRequest,
    @Body() activity: Activity
  ): Promise<void> {
    request.context.done(
      null,
      await this.postImageDimensionService.postImageDimension(activity)
    );
  }
}
