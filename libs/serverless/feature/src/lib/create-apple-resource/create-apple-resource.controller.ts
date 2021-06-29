import { Body, Controller, Get, Req } from '@nestjs/common';
import { AzureRequest } from '@nestjs/azure-func-http';

import { Activity } from '@dark-rush-photography/serverless/types';
import { CreateAppleResourceService } from './create-apple-resource.service';

@Controller('create-apple-resource')
export class CreateAppleResourceController {
  constructor(
    private readonly createAppleResourceService: CreateAppleResourceService
  ) {}

  @Get()
  async createAppleResource(
    @Req() request: AzureRequest,
    @Body() activity: Activity
  ): Promise<void> {
    request.context.done(
      null,
      await this.createAppleResourceService.createAppleResource(activity)
    );
  }
}
