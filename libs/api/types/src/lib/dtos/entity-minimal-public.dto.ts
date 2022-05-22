import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsISO8601,
  IsMongoId,
  IsOptional,
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
import { DimensionDto } from './dimension.dto';

export class EntityMinimalPublicDto implements EntityMinimalPublic {
  @IsEnum(EntityType)
  type!: EntityType;

  @IsMongoId()
  id!: string;

  @IsString()
  group!: string;

  @IsString()
  slug!: string;

  @IsInt()
  @Min(0)
  order!: number;

  @IsString()
  @IsOptional()
  title?: string;

  @IsISO8601()
  @IsOptional()
  createdDate?: string;

  @IsISO8601()
  publishedDate!: string;

  @IsBoolean()
  starredImageIsCentered!: boolean;

  @ValidateNested()
  @Type(() => ImagePublicDto)
  @IsOptional()
  starredImage?: ImagePublicDto;

  @ValidateNested()
  @Type(() => DimensionDto)
  @IsOptional()
  tileDimension?: DimensionDto;
}
