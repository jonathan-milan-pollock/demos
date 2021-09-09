import { Injectable } from '@nestjs/common';
import { InjectRepository, Repository } from '@nestjs/azure-database';

import { from, map, Observable, of } from 'rxjs';

import {
  GoogleDrivePushNotification,
  GoogleDrivePushNotificationType,
} from '@dark-rush-photography/api/types';
import { GoogleDriveChannelTable } from '@dark-rush-photography/api/data';
import { WebSocketMessageProvider } from '@dark-rush-photography/api/data';

@Injectable()
export class EntitiesPushNotificationsService {
  constructor(
    @InjectRepository(GoogleDriveChannelTable)
    private readonly googleDriveChannelRepository: Repository<GoogleDriveChannelTable>,
    private readonly webSocketMessageProvider: WebSocketMessageProvider
  ) {}

  create$(
    googleDrivePushNotification: GoogleDrivePushNotification
  ): Observable<void> {
    return from(
      this.googleDriveChannelRepository.findAll(
        this.googleDriveChannelRepository.where(
          'key == ? and token == ?',
          googleDrivePushNotification.googleChannelId,
          googleDrivePushNotification.googleChannelToken
        )
      )
    ).pipe(
      map((response) => {
        if (response.entries.length == 0) {
          return of(undefined);
        }

        if (
          googleDrivePushNotification.googleResourceState ==
          GoogleDrivePushNotificationType.Add
        ) {
          this.webSocketMessageProvider.sendMessage(`adding image`);
        }
      }),
      map(() => undefined)
    );
  }
}
