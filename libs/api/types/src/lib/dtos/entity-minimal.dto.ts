import { IsEnum, IsMongoId, IsString } from 'class-validator';

import { EntityType } from '@dark-rush-photography/shared/types';

export class EntityMinimalDto {
  @IsEnum(EntityType)
  type!: EntityType;

  @IsMongoId()
  id!: string;

  @IsString()
  group!: string;

  @IsString()
  slug!: string;
}
