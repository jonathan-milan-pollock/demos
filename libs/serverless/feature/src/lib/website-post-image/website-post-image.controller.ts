import { Body, Controller, Get, Req } from '@nestjs/common';
import { AzureRequest } from '@nestjs/azure-func-http';

import { Activity } from '@dark-rush-photography/serverless/types';
import { WebsitePostImageService } from './website-post-image.service';

@Controller('website-post-image')
export class WebsitePostImageController {
  constructor(
    private readonly websitePostImageService: WebsitePostImageService
  ) {}

  @Get()
  async websitePostImage(
    @Req() request: AzureRequest,
    @Body() imageActivity: Activity
  ): Promise<void> {
    request.context.done(
      null,
      await this.websitePostImageService.websitePostImage(imageActivity)
    );
  }
}
