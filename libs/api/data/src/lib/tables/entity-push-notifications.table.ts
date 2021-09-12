import {
  EntityPartitionKey,
  EntityRowKey,
  EntityString,
} from '@nestjs/azure-database';

@EntityPartitionKey('GoogleDriveChannelID')
@EntityRowKey('GoogleDriveChannelKey')
export class EntityPushNotificationsTable {
  @EntityString() key!: string;
  @EntityString() token!: string;
}
