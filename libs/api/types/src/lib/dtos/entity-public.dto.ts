import {
  IsArray,
  IsEnum,
  IsInt,
  IsISO8601,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { EntityPublic, EntityType } from '@dark-rush-photography/shared/types';
import { LocationDefinedDto } from './location-defined.dto';
import { ImagePublicDto } from './image-public.dto';

export class EntityPublicDto implements EntityPublic {
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

  @IsString()
  seoDescription!: string;

  @IsArray()
  @Type(() => String)
  seoKeywords: string[] = [];

  @IsISO8601()
  dateCreated!: string;

  @IsISO8601()
  datePublished!: string;

  @ValidateNested()
  @Type(() => LocationDefinedDto)
  location!: LocationDefinedDto;

  @IsArray()
  @Type(() => String)
  text: string[] = [];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImagePublicDto)
  images: ImagePublicDto[] = [];
}
