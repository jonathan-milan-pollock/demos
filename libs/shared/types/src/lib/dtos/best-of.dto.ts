import { IsArray, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { ImageMinimalDto } from './image-minimal.dto';

export class BestOfDto {
  @IsString()
  slug!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImageMinimalDto)
  images: ImageMinimalDto[] = [];
}
