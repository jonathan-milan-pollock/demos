import {
  EntityPartitionKey,
  EntityRowKey,
  EntityString,
} from '@nestjs/azure-database';

@EntityPartitionKey('SyncedImageID')
@EntityRowKey('SyncedImageKey')
export class SyncedImageTable {
  @EntityString() key!: string;
  @EntityString() entityId!: string;
  @EntityString() mediaId!: string;
  @EntityString() mediaType!: string;
}
