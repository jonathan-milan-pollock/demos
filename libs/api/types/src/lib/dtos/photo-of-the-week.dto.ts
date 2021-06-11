import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsDefined,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { LocationDto } from './location.dto';
import { ImageDto } from './image.dto';

export class PhotoOfTheWeekDto {
  @IsDefined()
  slug!: string;

  @IsNumber()
  group!: number;

  @IsOptional()
  title?: string;

  @IsOptional()
  description?: string;

  @IsArray()
  @IsOptional()
  keywords?: string[];

  @IsDateString()
  dateCreated!: string;

  @IsDateString()
  @IsOptional()
  datePublished?: string;

  @ValidateNested({ each: true })
  @Type(() => LocationDto)
  location!: LocationDto;

  @IsBoolean()
  useTitleImage!: boolean;

  @IsArray()
  text!: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImageDto)
  images!: ImageDto[];
}
