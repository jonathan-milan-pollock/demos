import { IsArray, IsString } from 'class-validator';
import { Type } from 'class-transformer';

import { ImageDto } from './image.dto';

export class BestOfResponseDto {
  @IsString()
  id!: string;

  @IsString()
  slug!: string;

  @IsArray()
  @Type(() => ImageDto)
  images: ImageDto[] = [];
}
