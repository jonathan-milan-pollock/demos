import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsISO8601,
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
import { ResolutionDto } from './resolution.dto';

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
  @IsOptional()
  title?: string;

  @IsISO8601()
  @IsOptional()
  createdDate?: string;

  @IsISO8601()
  publishedDate!: string;

  @IsBoolean()
  hasStarredImage!: boolean;

  @IsBoolean()
  starredImageIsCentered!: boolean;

  @ValidateNested()
  @Type(() => ImagePublicDto)
  @IsOptional()
  starredImage?: ImagePublicDto;

  @ValidateNested()
  @Type(() => ResolutionDto)
  @IsOptional()
  tileDimension?: ResolutionDto;
}
