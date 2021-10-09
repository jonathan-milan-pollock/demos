import {
  IsArray,
  IsBoolean,
  IsInt,
  IsISO8601,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { ImagePublic } from '@dark-rush-photography/shared/types';
import { ResolutionDto } from './resolution.dto';

export class ImagePublicDto implements ImagePublic {
  @IsString()
  storageId!: string;

  @IsString()
  fileName!: string;

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
  @Type(() => ResolutionDto)
  smallResolution!: ResolutionDto;

  @IsBoolean()
  isThreeSixty!: boolean;
}
