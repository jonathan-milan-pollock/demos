import { IsBoolean, IsEnum, IsMongoId, IsString } from 'class-validator';

import {
  CronProcessResponse,
  CronProcessType,
  EntityType,
} from '@dark-rush-photography/shared/types';

export class CronProcessResponseDto implements CronProcessResponse {
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
  slug!: string;

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
