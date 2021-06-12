import { IsArray, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { ImageDto } from './image.dto';
import { VideoDto } from './video.dto';

export class AboutResponseDto {
  @IsString()
  id!: string;

  @IsString()
  slug!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImageDto)
  images: ImageDto[] = [];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VideoDto)
  videos: VideoDto[] = [];
}
