import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { ImageDto } from './image.dto';

export class ReviewDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsArray()
  text: string[] = [];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImageDto)
  images: ImageDto[] = [];
}
