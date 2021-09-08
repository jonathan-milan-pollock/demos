import {
  EntityPartitionKey,
  EntityRowKey,
  EntityString,
} from '@nestjs/azure-database';

@EntityPartitionKey('GoogleDriveChannelID')
@EntityRowKey('GoogleDriveChannelKey')
export class GoogleDriveChannelTable {
  @EntityString() key!: string;
  @EntityString() token!: string;
}
