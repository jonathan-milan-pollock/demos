import { Body, Controller, Get, Req } from '@nestjs/common';
import { AzureRequest } from '@nestjs/azure-func-http';

import { Activity } from '@dark-rush-photography/serverless/types';
import { PostEntityService } from './post-entity.service';

@Controller('post-entity')
export class PostEntityController {
  constructor(private readonly postEntityService: PostEntityService) {}

  @Get()
  async postEntity(
    @Req() request: AzureRequest,
    @Body() activity: Activity
  ): Promise<void> {
    request.context.done(
      null,
      await this.postEntityService.postEntity(activity)
    );
  }
}
