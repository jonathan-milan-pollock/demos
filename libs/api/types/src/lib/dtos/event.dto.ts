import {
  IsArray,
  IsInt,
  IsISO8601,
  IsNumberString,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { LocationDto } from './location.dto';
import { ImageMinimalDto } from './image-minimal.dto';

export class EventDto {
  @IsNumberString()
  group!: string;

  @IsString()
  slug!: string;

  @IsInt()
  @Min(0)
  order!: number;

  @IsString()
  title!: string;

  @IsString()
  description!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => String)
  keywords: string[] = [];

  @IsISO8601()
  dateCreated!: string;

  @ValidateNested()
  @Type(() => LocationDto)
  location!: LocationDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => String)
  text: string[] = [];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImageMinimalDto)
  images: ImageMinimalDto[] = [];
}
