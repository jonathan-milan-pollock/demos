import {
  EntityPartitionKey,
  EntityRowKey,
  EntityString,
} from '@nestjs/azure-database';

@EntityPartitionKey('ImageProcessID')
@EntityRowKey('ImageProcessKey')
export class ImageProcessTable {
  @EntityString() key!: string;
  @EntityString() type!: string;
  @EntityString() action!: string;
}
