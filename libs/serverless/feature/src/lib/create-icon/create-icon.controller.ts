import { Body, Controller, Get, Req } from '@nestjs/common';
import { AzureRequest } from '@nestjs/azure-func-http';

import { Activity } from '@dark-rush-photography/serverless/types';
import { CreateIconService } from './create-icon.service';

@Controller('create-icon')
export class CreateIconController {
  constructor(private readonly createIconService: CreateIconService) {}

  @Get()
  async createIcon(
    @Req() request: AzureRequest,
    @Body() activity: Activity
  ): Promise<void> {
    request.context.done(
      null,
      await this.createIconService.createIcon(activity)
    );
  }
}
