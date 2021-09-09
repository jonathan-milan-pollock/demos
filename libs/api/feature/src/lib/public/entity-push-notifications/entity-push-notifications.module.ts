import { Module } from '@nestjs/common';
import { AzureTableStorageModule } from '@nestjs/azure-database';

import { GoogleDriveChannelTable } from '@dark-rush-photography/api/data';
import { WebSocketMessageProvider } from '@dark-rush-photography/api/data';
import { EntitiesPushNotificationsService } from './entity-push-notifications.service';
import { EntityPushNotificationsController } from './entity-push-notifications.controller';

@Module({
  imports: [
    AzureTableStorageModule.forFeature(GoogleDriveChannelTable, {
      table: 'GoogleDriveChannel',
      createTableIfNotExists: true,
    }),
  ],
  controllers: [EntityPushNotificationsController],
  providers: [EntitiesPushNotificationsService, WebSocketMessageProvider],
})
export class EntityPushNotificationsModule {}
