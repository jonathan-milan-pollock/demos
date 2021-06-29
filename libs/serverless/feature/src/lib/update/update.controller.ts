import { Controller, Headers, Post, Req } from '@nestjs/common';
import { AzureRequest } from '@nestjs/azure-func-http';

import { EntityType, PostState } from '@dark-rush-photography/shared-types';
import { UpdateService } from './update.service';

@Controller('update')
export class UpdateController {
  constructor(private readonly updateService: UpdateService) {}

  @Post()
  async update(
    @Headers('x-entity-id') entityId: string,
    @Headers('x-entity-type') entityType: EntityType,
    @Headers('x-entity-group') entityGroup: string,
    @Headers('x-entity-slug') entitySlug: string,
    @Headers('x-post-state') postState: PostState,
    @Req() request: AzureRequest
  ): Promise<void> {
    request.context.done(
      null,
      await this.updateService.update(
        entityId,
        entityType,
        entityGroup,
        entitySlug,
        postState,
        request
      )
    );
  }
}
