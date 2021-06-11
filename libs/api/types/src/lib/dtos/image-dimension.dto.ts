import { IsEnum, IsNumber, IsOptional } from 'class-validator';

import {
  ImageDimension,
  ImageProcessState,
  ImageDimensionType,
} from '@dark-rush-photography/shared-types';

export class ImageDimensionDto implements ImageDimension {
  @IsEnum(ImageDimensionType)
  type!: ImageDimensionType;

  @IsEnum(ImageProcessState)
  state!: ImageProcessState;

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
