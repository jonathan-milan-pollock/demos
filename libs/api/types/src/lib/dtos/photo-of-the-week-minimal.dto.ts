import {
  IsArray,
  IsBoolean,
  IsInt,
  IsISO8601,
  IsNumberString,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { ImageDimensionDto } from './image-dimension.dto';
import { ImageMinimalDto } from './image-minimal.dto';

export class PhotoOfTheWeekMinimalDto {
  @IsNumberString()
  group!: string;

  @IsString()
  slug!: string;

  @IsInt()
  @Min(0)
  order!: number;

  @IsString()
  title!: string;

  @IsISO8601()
  datePublished!: string;

  @IsBoolean()
  photoAlbumImageIsCentered!: boolean;

  @ValidateNested()
  @Type(() => ImageMinimalDto)
  starredImage!: ImageMinimalDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImageDimensionDto)
  starredTileImageDimensions!: ImageDimensionDto;
}
