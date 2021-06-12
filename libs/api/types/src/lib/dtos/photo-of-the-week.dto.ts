import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { LocationDto } from './location.dto';
import { ImageDto } from './image.dto';

export class PhotoOfTheWeekDto {
  @IsString()
  slug!: string;

  @IsNumber()
  group!: number;

  @IsBoolean()
  isPublic!: boolean;

  @ValidateNested({ each: true })
  @Type(() => LocationDto)
  @IsOptional()
  location?: LocationDto;

  @IsBoolean()
  useTitleImage!: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImageDto)
  images: ImageDto[] = [];
}
