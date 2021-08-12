import { IsBoolean, IsEnum, IsString } from 'class-validator';

import { EntityType } from '../enums/entity-type.enum';

export class EntityCreateDto {
  @IsEnum(EntityType)
  type!: EntityType;

  @IsString()
  group!: string;

  @IsString()
  slug!: string;

  @IsBoolean()
  isPublic!: boolean;
}
