import { Injectable } from '@nestjs/common';
import { InjectRepository, Repository } from '@nestjs/azure-database';

import { from, map, Observable, of } from 'rxjs';

import {
  EntityPushNotification,
  EntityPushNotificationType,
} from '@dark-rush-photography/shared/types';
import { EntityPushNotificationsTable } from '@dark-rush-photography/api/data';
import { WebSocketMessageProvider } from '@dark-rush-photography/api/data';

@Injectable()
export class EntitiesPushNotificationsService {
  constructor(
    @InjectRepository(EntityPushNotificationsTable)
    private readonly entityPushNotificationsRepository: Repository<EntityPushNotificationsTable>,
    private readonly webSocketMessageProvider: WebSocketMessageProvider
  ) {}

  create$(entityPushNotification: EntityPushNotification): Observable<void> {
    return from(
      this.entityPushNotificationsRepository.findAll(
        this.entityPushNotificationsRepository.where(
          'key == ? and token == ?',
          entityPushNotification.channelId,
          entityPushNotification.channelToken
        )
      )
    ).pipe(
      map((response) => {
        if (response.entries.length === 0) {
          return of(undefined);
        }

        if (
          entityPushNotification.resourceState ===
          EntityPushNotificationType.Add
        ) {
          this.webSocketMessageProvider.sendMessage(`adding image`);
        }
      }),
      map(() => undefined)
    );
  }
}
