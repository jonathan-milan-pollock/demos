import { Controller, Headers, Post, Req } from '@nestjs/common';
import { AzureRequest } from '@nestjs/azure-func-http';

import { EntityType, PostState } from '@dark-rush-photography/shared-types';
import { DeleteService } from './delete.service';

@Controller('delete')
export class DeleteController {
  constructor(private readonly deleteService: DeleteService) {}

  @Post()
  async delete(
    @Headers('x-entity-id') entityId: string,
    @Headers('x-entity-type') entityType: EntityType,
    @Headers('x-entity-group') entityGroup: string,
    @Headers('x-entity-slug') entitySlug: string,
    @Headers('x-post-state') postState: PostState,
    @Req() request: AzureRequest
  ): Promise<void> {
    request.context.done(
      null,
      await this.deleteService.delete(
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
