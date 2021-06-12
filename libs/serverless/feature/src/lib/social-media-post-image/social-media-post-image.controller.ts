import { Body, Controller, Get, Req } from '@nestjs/common';
import { AzureRequest } from '@nestjs/azure-func-http';

import { ImageActivity } from '@dark-rush-photography/serverless/types';
import { SocialMediaPostImageService } from './social-media-post-image.service';

@Controller('social-media-post-image')
export class SocialMediaPostImageController {
  constructor(
    private readonly socialMediaPostImageService: SocialMediaPostImageService
  ) {}

  @Get()
  async socialMediaPostImage(
    @Req() request: AzureRequest,
    @Body() imageActivity: ImageActivity
  ): Promise<void> {
    request.context.done(
      null,
      await this.socialMediaPostImageService.socialMediaPostImage(imageActivity)
    );
  }
}
