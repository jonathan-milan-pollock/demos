import { IsArray, IsMongoId, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { Media } from '@dark-rush-photography/shared-types';
import { ImageDto } from './image.dto';
import { ImageDimensionDto } from './image-dimension.dto';
import { VideoDto } from './video.dto';
import { VideoDimensionDto } from './video-dimension.dto';

export class MediaDto implements Media {
  @IsMongoId()
  id!: string;

  @IsString()
  slug!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImageDto)
  images: ImageDto[] = [];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImageDimensionDto)
  imageDimensions: ImageDimensionDto[] = [];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VideoDto)
  videos: VideoDto[] = [];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VideoDimensionDto)
  videoDimensions: VideoDimensionDto[] = [];
}
