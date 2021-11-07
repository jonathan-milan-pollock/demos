import {
  IsArray,
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

import { EntityPublic, EntityType } from '@dark-rush-photography/shared/types';
import { LocationDto } from './location.dto';
import { ImagePublicDto } from './image-public.dto';

export class EntityPublicDto implements EntityPublic {
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

  @IsString()
  @IsOptional()
  text?: string;

  @IsISO8601()
  @IsOptional()
  createdDate?: string;

  @IsISO8601()
  publishedDate!: string;

  @IsString()
  @IsOptional()
  seoDescription?: string;

  @IsArray()
  @Type(() => String)
  seoKeywords: string[] = [];

  @ValidateNested()
  @Type(() => LocationDto)
  @IsOptional()
  location?: LocationDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImagePublicDto)
  images: ImagePublicDto[] = [];
}
