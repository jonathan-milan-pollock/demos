import {
  IsBoolean,
  IsInt,
  IsNumberString,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { ImageMinimalDto } from './image-minimal.dto';
import { ImageDimensionDto } from './image-dimension.dto';

export class EventMinimalDto {
  @IsNumberString()
  group!: string;

  @IsString()
  slug!: string;

  @IsInt()
  @Min(0)
  order!: number;

  @IsString()
  title!: string;

  @IsBoolean()
  starredImageIsCentered!: boolean;

  @ValidateNested()
  @Type(() => ImageMinimalDto)
  starredImage!: ImageMinimalDto;

  @ValidateNested()
  @Type(() => ImageDimensionDto)
  starredTileImageDimensions!: ImageDimensionDto;
}
