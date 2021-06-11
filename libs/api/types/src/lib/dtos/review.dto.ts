import { IsArray, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { ImageDto } from './image.dto';

export class ReviewDto {
  @IsOptional()
  title!: string;

  @IsArray()
  text!: string[];

  @ValidateNested({ each: true })
  @Type(() => ImageDto)
  image!: ImageDto;
}
