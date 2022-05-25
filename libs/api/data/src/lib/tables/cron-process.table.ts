import {
  EntityBoolean,
  EntityPartitionKey,
  EntityRowKey,
  EntityString,
} from '@nestjs/azure-database';

@EntityPartitionKey('CronProcessID')
@EntityRowKey('CronProcessKey')
export class CronProcessTable {
  @EntityString() key!: string;
  @EntityString() type!: string;
  @EntityString() entityType!: string;
  @EntityString() entityId!: string;
  @EntityString() group!: string;
  @EntityString() pathname!: string;
  @EntityBoolean() postSocialMedia!: boolean;
  @EntityBoolean() ready!: boolean;
  @EntityBoolean() running!: boolean;
  @EntityBoolean() completed!: boolean;
  @EntityBoolean() error!: boolean;
}
