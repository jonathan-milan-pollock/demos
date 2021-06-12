import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { ImageDto } from './image.dto';

export class BestOfDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImageDto)
  images: ImageDto[] = [];
}
