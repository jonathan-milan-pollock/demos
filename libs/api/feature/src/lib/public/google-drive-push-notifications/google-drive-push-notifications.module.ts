import { Module } from '@nestjs/common';
import { AzureTableStorageModule } from '@nestjs/azure-database';

import {
  GoogleDriveChannelTable,
  WebSocketMessageTable,
} from '@dark-rush-photography/shared-server/data';
import { GoogleDrivePushNotificationsService } from './google-drive-push-notifications.service';
import { GoogleDrivePushNotificationsController } from './google-drive-push-notifications.controller';
import { WebSocketMessageProvider } from '@dark-rush-photography/api/data';

@Module({
  imports: [
    AzureTableStorageModule.forFeature(GoogleDriveChannelTable, {
      table: 'GoogleDriveChannel',
      createTableIfNotExists: true,
    }),
    AzureTableStorageModule.forFeature(WebSocketMessageTable, {
      table: 'WebSocketMessage',
      createTableIfNotExists: true,
    }),
  ],
  controllers: [GoogleDrivePushNotificationsController],
  providers: [GoogleDrivePushNotificationsService, WebSocketMessageProvider],
})
export class GoogleDrivePushNotificationsModule {}
