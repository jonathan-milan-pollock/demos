import {
  IsArray,
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { EntityUpdate } from '@dark-rush-photography/shared/types';
import { LocationDto } from './location.dto';

export class EntityUpdateDto implements EntityUpdate {
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
  seoDescription?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => String)
  seoKeywords: string[] = [];

  @IsString()
  @IsOptional()
  dateCreated?: string;

  @IsString()
  @IsOptional()
  datePublished?: string;

  @ValidateNested()
  @Type(() => LocationDto)
  @IsOptional()
  location?: LocationDto;

  @IsBoolean()
  starredImageIsCentered!: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => String)
  text: string[] = [];

  @IsBoolean()
  isPublic!: boolean;
}
