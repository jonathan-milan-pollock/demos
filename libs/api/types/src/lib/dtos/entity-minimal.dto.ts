import { IsEnum, IsMongoId, IsString } from 'class-validator';

import {
  EntityMinimal,
  EntityType,
  WatermarkedType,
} from '@dark-rush-photography/shared/types';

export class EntityMinimalDto implements EntityMinimal {
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
