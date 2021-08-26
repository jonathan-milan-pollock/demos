import {
  EntityPartitionKey,
  EntityRowKey,
  EntityString,
} from '@nestjs/azure-database';

@EntityPartitionKey('SyncedImageID')
@EntityRowKey('SyncedImageKey')
export class SyncedImageDimensionTable {
  @EntityString() key!: string;
  @EntityString() entityId!: string;
  @EntityString() mediaId!: string;
  @EntityString() mediaType!: string;
  @EntityString() imageDimensionId!: string;
}
