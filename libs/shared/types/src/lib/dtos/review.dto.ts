import { IsArray, IsInt, IsString, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { ImageMinimalDto } from './image-minimal.dto';

export class ReviewDto {
  @IsString()
  slug!: string;

  @IsInt()
  @Min(0)
  order!: number;

  @IsString()
  title!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => String)
  text: string[] = [];

  @ValidateNested()
  @Type(() => ImageMinimalDto)
  image!: ImageMinimalDto;
}
