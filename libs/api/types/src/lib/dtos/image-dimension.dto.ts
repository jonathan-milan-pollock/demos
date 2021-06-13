import { IsEnum, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import {
  ImageDimension,
  ImageDimensionState,
  ImageDimensionType,
} from '@dark-rush-photography/shared-types';
import { ImageDimensionPixelsDto } from './image-dimension-pixels.dto';
import { ThreeSixtyImageSettingsDto } from './three-sixty-image-settings.dto';

export class ImageDimensionDto implements ImageDimension {
  @IsString()
  entityId!: string;

  @IsString()
  imageSlug!: string;

  @IsEnum(ImageDimensionType)
  type!: ImageDimensionType;

  @IsEnum(ImageDimensionState)
  state!: ImageDimensionState;

  @ValidateNested()
  @Type(() => ImageDimensionPixelsDto)
  pixels!: ImageDimensionPixelsDto;

  @ValidateNested()
  @Type(() => ThreeSixtyImageSettingsDto)
  @IsOptional()
  threeSixtyImageSettings?: ThreeSixtyImageSettingsDto;
}
