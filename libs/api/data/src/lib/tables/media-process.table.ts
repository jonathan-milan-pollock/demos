import {
  EntityBoolean,
  EntityPartitionKey,
  EntityRowKey,
  EntityString,
} from '@nestjs/azure-database';

@EntityPartitionKey('MediaProcessID')
@EntityRowKey('MediaProcessKey')
export class MediaProcessTable {
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
