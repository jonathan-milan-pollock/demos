import {
  IsArray,
  IsBoolean,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { Review } from '@dark-rush-photography/shared-types';
import { ImageDto } from './image.dto';
import { ImageDimensionDto } from './image-dimension.dto';

export class ReviewResponseDto implements Review {
  @IsString()
  id!: string;

  @IsBoolean()
  isPublic!: boolean;

  @IsString()
  @IsOptional()
  title?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => String)
  text: string[] = [];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImageDto)
  images: ImageDto[] = [];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImageDimensionDto)
  imageDimensions: ImageDimensionDto[] = [];
}
