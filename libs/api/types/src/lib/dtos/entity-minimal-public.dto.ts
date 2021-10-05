import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsISO8601,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import {
  EntityMinimalPublic,
  EntityType,
} from '@dark-rush-photography/shared/types';
import { ImagePublicDto } from './image-public.dto';

export class EntityMinimalPublicDto implements EntityMinimalPublic {
  @IsEnum(EntityType)
  type!: EntityType;

  @IsString()
  group!: string;

  @IsString()
  slug!: string;

  @IsInt()
  @Min(0)
  order!: number;

  @IsString()
  title!: string;

  @IsISO8601()
  dateCreated!: string;

  @IsISO8601()
  datePublished!: string;

  @IsBoolean()
  hasStarredImage!: boolean;

  @IsBoolean()
  starredImageIsCentered!: boolean;

  @ValidateNested()
  @Type(() => ImagePublicDto)
  starredImage!: ImagePublicDto;
}
