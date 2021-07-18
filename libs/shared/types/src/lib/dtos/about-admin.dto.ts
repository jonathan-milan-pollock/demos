import {
  IsArray,
  IsInt,
  IsMongoId,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { About } from '../interfaces/about.interface';
import { ImageAdminDto } from './image-admin.dto';
import { ImageDimensionDto } from './image-dimension.dto';
import { VideoAdminDto } from './video-admin.dto';
import { VideoDimensionDto } from './video-dimension.dto';

export class AboutAdminDto implements About {
  @IsMongoId()
  id!: string;

  @IsString()
  slug!: string;

  @IsInt()
  @Min(0)
  order!: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImageAdminDto)
  images: ImageAdminDto[] = [];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImageDimensionDto)
  imageDimensions: ImageDimensionDto[] = [];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VideoAdminDto)
  videos: VideoAdminDto[] = [];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VideoDimensionDto)
  videoDimensions: VideoDimensionDto[] = [];
}
