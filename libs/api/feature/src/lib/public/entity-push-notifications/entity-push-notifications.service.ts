import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository, Repository } from '@nestjs/azure-database';
import { Cron, CronExpression } from '@nestjs/schedule';

import { from, map, Observable, of } from 'rxjs';

import {
  EntityPushNotification,
  EntityPushNotificationType,
} from '@dark-rush-photography/shared/types';
import { EntityPushNotificationsTable } from '@dark-rush-photography/api/data';
import { WebSocketMessageProvider } from '@dark-rush-photography/api/data';

@Injectable()
export class EntitiesPushNotificationsService {
  private readonly logger: Logger;

  constructor(
    @InjectRepository(EntityPushNotificationsTable)
    private readonly entityPushNotificationsRepository: Repository<EntityPushNotificationsTable>,
    private readonly webSocketMessageProvider: WebSocketMessageProvider
  ) {
    this.logger = new Logger(EntitiesPushNotificationsService.name);
  }

  @Cron(CronExpression.EVERY_DAY_AT_4AM, {
    timeZone: 'US/Eastern',
  })
  handleUpdates(): void {
    this.logger.log('remove temp files'); // TODO: Where to put this?
    this.logger.log('remove entries in entity push notifications table');
  }

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
