import {
  IsArray,
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

import { EntityAdmin, EntityType } from '@dark-rush-photography/shared/types';
import { LocationDto } from './location.dto';
import { ImageAdminDto } from './image-admin.dto';
import { ImageVideoDto } from './image-video.dto';
import { ResolutionDto } from './resolution.dto';

export class EntityAdminDto implements EntityAdmin {
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

  @IsBoolean()
  isPublic!: boolean;

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
  @IsOptional()
  publishedDate?: string;

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

  @IsBoolean()
  hasStarredImage!: boolean;

  @IsBoolean()
  starredImageIsCentered!: boolean;

  @ValidateNested()
  @Type(() => ImageAdminDto)
  @IsOptional()
  starredImage?: ImageAdminDto;

  @ValidateNested()
  @Type(() => ImageVideoDto)
  @IsOptional()
  imageVideo?: ImageVideoDto;

  @ValidateNested()
  @Type(() => ResolutionDto)
  @IsOptional()
  tileDimension?: ResolutionDto;
}
