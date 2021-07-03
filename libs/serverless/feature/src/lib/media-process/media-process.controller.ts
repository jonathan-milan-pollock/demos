import { Controller, Headers, Post, Req } from '@nestjs/common';
import { AzureRequest } from '@nestjs/azure-func-http';

import { EntityType, MediaState } from '@dark-rush-photography/shared/types';
import { MediaProcessService } from './media-process.service';

@Controller('media-process')
export class MediaProcessController {
  constructor(private readonly mediaProcessService: MediaProcessService) {}

  @Post()
  async mediaProcess(
    @Headers('x-entity-id') entityId: string,
    @Headers('x-entity-type') entityType: EntityType,
    @Headers('x-entity-group') entityGroup: string,
    @Headers('x-entity-slug') entitySlug: string,
    @Headers('x-media-state') mediaState: MediaState,
    @Req() request: AzureRequest
  ): Promise<void> {
    request.context.done(
      null,
      await this.mediaProcessService.mediaProcess(
        entityId,
        entityType,
        entityGroup,
        entitySlug,
        mediaState,
        request
      )
    );
  }
}
