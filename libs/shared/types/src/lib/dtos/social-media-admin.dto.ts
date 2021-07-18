import { IsArray, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { SocialMedia } from '../interfaces/social-media.interface';
import { ImageAdminDto } from './image-admin.dto';
import { ImageDimensionDto } from './image-dimension.dto';
import { VideoAdminDto } from './video-admin.dto';
import { VideoDimensionDto } from './video-dimension.dto';

export class SocialMediaAdminDto implements SocialMedia {
  @IsString()
  id!: string;

  @IsString()
  group!: string;

  @IsString()
  slug!: string;

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
