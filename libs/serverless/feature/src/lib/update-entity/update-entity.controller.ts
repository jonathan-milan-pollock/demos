import { Body, Controller, Get, Req } from '@nestjs/common';
import { AzureRequest } from '@nestjs/azure-func-http';

import { Activity } from '@dark-rush-photography/serverless/types';
import { UpdateEntityService } from './update-entity.service';

@Controller('update-entity')
export class UpdateEntityController {
  constructor(private readonly updateEntityService: UpdateEntityService) {}

  @Get()
  async updateEntity(
    @Req() request: AzureRequest,
    @Body() activity: Activity
  ): Promise<void> {
    request.context.done(
      null,
      await this.updateEntityService.updateEntity(activity)
    );
  }
}
