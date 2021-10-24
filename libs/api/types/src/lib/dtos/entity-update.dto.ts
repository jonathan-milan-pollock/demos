import {
  IsArray,
  IsBoolean,
  IsISO8601,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { EntityUpdate } from '@dark-rush-photography/shared/types';
import { LocationDto } from './location.dto';
import { ResolutionDto } from './resolution.dto';

export class EntityUpdateDto implements EntityUpdate {
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
  starredImageIsCentered!: boolean;

  @ValidateNested()
  @Type(() => ResolutionDto)
  @IsOptional()
  tileDimension?: ResolutionDto;
}
