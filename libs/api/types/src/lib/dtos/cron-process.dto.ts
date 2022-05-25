import { IsBoolean, IsEnum, IsMongoId, IsString } from 'class-validator';

import {
  CronProcess,
  CronProcessType,
  EntityType,
} from '@dark-rush-photography/shared/types';

export class CronProcessDto implements CronProcess {
  @IsString()
  key!: string;

  @IsEnum(CronProcessType)
  type!: CronProcessType;

  @IsEnum(EntityType)
  entityType!: EntityType;

  @IsMongoId()
  entityId!: string;

  @IsString()
  group!: string;

  @IsString()
  pathname!: string;

  @IsBoolean()
  postSocialMedia!: boolean;

  @IsBoolean()
  ready!: boolean;

  @IsBoolean()
  running!: boolean;

  @IsBoolean()
  completed!: boolean;

  @IsBoolean()
  error!: boolean;
}
