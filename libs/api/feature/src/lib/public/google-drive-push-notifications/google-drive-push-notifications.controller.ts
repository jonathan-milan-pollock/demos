import { Controller, Headers, HttpCode, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { Observable } from 'rxjs';

import { GoogleDrivePushNotificationType } from '@dark-rush-photography/api/types';
import { Public } from '@dark-rush-photography/api/util';
import { GoogleDrivePushNotificationsService } from './google-drive-push-notifications.service';

@Controller({ path: 'google-drive/push-notifications', version: '1' })
@Public()
@ApiTags('Public Google Drive Push Notifications')
export class GoogleDrivePushNotificationsController {
  constructor(
    private readonly googleDrivePushNotificationsService: GoogleDrivePushNotificationsService
  ) {}

  @Post()
  @ApiOkResponse({ type: String })
  @HttpCode(200)
  create$(
    @Headers('X-Goog-Channel-ID') googleChannelId: string,
    @Headers('X-Goog-Channel-Token') googleChannelToken: string,
    @Headers('X-Goog-Resource-ID') googleResourceId: string,
    @Headers('X-Goog-Resource-State') googleResourceState: string
  ): Observable<void> {
    return this.googleDrivePushNotificationsService.create$({
      googleChannelId,
      googleChannelToken,
      googleResourceId,
      googleResourceState:
        googleResourceState.toLowerCase() as GoogleDrivePushNotificationType,
    });
  }
}
