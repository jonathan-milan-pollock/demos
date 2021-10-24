import {
  EntityBoolean,
  EntityPartitionKey,
  EntityRowKey,
  EntityString,
} from '@nestjs/azure-database';

import { CronProcess } from '@dark-rush-photography/shared/types';

@EntityPartitionKey('CronProcessID')
@EntityRowKey('CronProcessKey')
export class CronProcessTable implements CronProcess {
  @EntityString() key!: string;
  @EntityString() type!: string;
  @EntityString() entityType!: string;
  @EntityString() entityId!: string;
  @EntityString() group!: string;
  @EntityString() slug!: string;
  @EntityBoolean() postSocialMedia!: boolean;
  @EntityBoolean() ready!: boolean;
  @EntityBoolean() running!: boolean;
  @EntityBoolean() completed!: boolean;
  @EntityBoolean() error!: boolean;
}
