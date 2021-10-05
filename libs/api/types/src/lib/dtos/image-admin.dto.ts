import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsISO8601,
  IsMongoId,
  IsString,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { ImageAdmin, ImageState } from '@dark-rush-photography/shared/types';
import { ResolutionDto } from './resolution.dto';

export class ImageAdminDto implements ImageAdmin {
  @IsUUID()
  id!: string;

  @IsMongoId()
  entityId!: string;

  @IsUUID()
  storageId!: string;

  @IsString()
  fileName!: string;

  @IsEnum(ImageState)
  state!: ImageState;

  @IsInt()
  @Min(0)
  order!: number;

  @IsBoolean()
  isStarred!: boolean;

  @IsBoolean()
  isLoved!: boolean;

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
