import { Body, Controller, Get, Req } from '@nestjs/common';
import { AzureRequest } from '@nestjs/azure-func-http';

import { Activity } from '@dark-rush-photography/serverless/types';
import { DeleteEntityService } from './delete-entity.service';

@Controller('delete-entity')
export class DeleteEntityController {
  constructor(private readonly deleteEntityService: DeleteEntityService) {}

  @Get()
  async deleteEntity(
    @Req() request: AzureRequest,
    @Body() activity: Activity
  ): Promise<void> {
    request.context.done(
      null,
      await this.deleteEntityService.deleteEntity(activity)
    );
  }
}
