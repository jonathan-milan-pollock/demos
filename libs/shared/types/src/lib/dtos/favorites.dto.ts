import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { ImageMinimalDto } from './image-minimal.dto';
import { VideoMinimalDto } from './video-minimal.dto';

export class FavoritesDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImageMinimalDto)
  images: ImageMinimalDto[] = [];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VideoMinimalDto)
  videos: VideoMinimalDto[] = [];
}
