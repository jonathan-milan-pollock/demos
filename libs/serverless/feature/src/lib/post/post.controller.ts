import { Controller, Headers, Post, Req } from '@nestjs/common';
import { AzureRequest } from '@nestjs/azure-func-http';

import { EntityType, PostState } from '@dark-rush-photography/shared-types';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async post(
    @Headers('x-entity-id') entityId: string,
    @Headers('x-entity-type') entityType: EntityType,
    @Headers('x-entity-group') entityGroup: string,
    @Headers('x-entity-slug') entitySlug: string,
    @Headers('x-post-state') postState: PostState,
    @Req() request: AzureRequest
  ): Promise<void> {
    request.context.done(
      null,
      await this.postService.post(
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
