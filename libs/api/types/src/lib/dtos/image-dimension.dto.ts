import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

import {
  ImageDimension,
  ImageDimensionState,
  ImageDimensionType,
} from '@dark-rush-photography/shared-types';

export class ImageDimensionDto implements ImageDimension {
  @IsString()
  entityId!: string;

  @IsString()
  imageSlug!: string;

  @IsEnum(ImageDimensionType)
  type!: ImageDimensionType;

  @IsEnum(ImageDimensionState)
  state!: ImageDimensionState;

  @IsNumber()
  width!: number;

  @IsNumber()
  height!: number;

  @IsNumber()
  @IsOptional()
  pitch?: number;

  @IsNumber()
  @IsOptional()
  yaw?: number;

  @IsNumber()
  @IsOptional()
  hfov?: number;
}
