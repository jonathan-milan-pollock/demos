import { IsEnum, IsMongoId, IsString } from 'class-validator';

import {
  EntityMinimalAdmin,
  EntityType,
  WatermarkedType,
} from '@dark-rush-photography/shared/types';

export class EntityMinimalAdminDto implements EntityMinimalAdmin {
  @IsEnum(EntityType)
  type!: EntityType;

  @IsMongoId()
  id!: string;

  @IsEnum(WatermarkedType)
  watermarkedType!: WatermarkedType;

  @IsString()
  group!: string;

  @IsString()
  slug!: string;
}
