import { Module } from '@nestjs/common';
import { AzureTableStorageModule } from '@nestjs/azure-database';

import {
  EntityPushNotificationsTable,
  WebSocketMessageProvider,
} from '@dark-rush-photography/api/data';
import { EntitiesPushNotificationsService } from './entity-push-notifications.service';
import { EntityPushNotificationsController } from './entity-push-notifications.controller';

@Module({
  imports: [
    AzureTableStorageModule.forFeature(EntityPushNotificationsTable, {
      table: 'EntityPushNotifications',
      createTableIfNotExists: true,
    }),
  ],
  controllers: [EntityPushNotificationsController],
  providers: [EntitiesPushNotificationsService, WebSocketMessageProvider],
})
export class EntityPushNotificationsModule {}
