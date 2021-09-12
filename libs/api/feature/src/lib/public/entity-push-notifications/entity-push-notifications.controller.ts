import { Controller, Headers, HttpCode, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { Observable } from 'rxjs';

import { EntityPushNotificationType } from '@dark-rush-photography/shared/types';
import { Public } from '@dark-rush-photography/api/util';
import { EntitiesPushNotificationsService } from './entity-push-notifications.service';

@Controller({ path: 'entity-push-notifications', version: '1' })
@Public()
@ApiTags('Public Entity Push Notifications')
export class EntityPushNotificationsController {
  constructor(
    private readonly entitiesPushNotificationsService: EntitiesPushNotificationsService
  ) {}

  @Post()
  @ApiOkResponse({ type: String })
  @HttpCode(200)
  create$(
    @Headers('X-Goog-Channel-ID') channelId: string,
    @Headers('X-Goog-Channel-Token') channelToken: string,
    @Headers('X-Goog-Resource-ID') resourceId: string,
    @Headers('X-Goog-Resource-State') resourceState: string
  ): Observable<void> {
    return this.entitiesPushNotificationsService.create$({
      channelId,
      channelToken,
      resourceId,
      resourceState: resourceState.toLowerCase() as EntityPushNotificationType,
    });
  }
}
