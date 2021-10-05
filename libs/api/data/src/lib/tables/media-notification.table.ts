import {
  EntityBoolean,
  EntityPartitionKey,
  EntityRowKey,
  EntityString,
} from '@nestjs/azure-database';

@EntityPartitionKey('MediaNotificationID')
@EntityRowKey('MediaNotificationKey')
export class MediaNotificationTable {
  @EntityString() key!: string;
  @EntityString() type!: string;
  @EntityString() entityId!: string;
  @EntityString() mediaId!: string;
  @EntityString() imageState!: string;
  @EntityBoolean() ready!: boolean;
  @EntityBoolean() started!: boolean;
  @EntityBoolean() running!: boolean;
  @EntityBoolean() completed!: boolean;
}
