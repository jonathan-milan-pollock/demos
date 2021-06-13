import {
  IsArray,
  IsBoolean,
  IsISO8601,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { Destination } from '@dark-rush-photography/shared-types';
import { LocationDto } from './location.dto';
import { ImageDto } from './image.dto';
import { ImageDimensionDto } from './image-dimension.dto';
import { VideoDto } from './video.dto';
import { VideoDimensionDto } from './video-dimension.dto';
import { ExtendedRealityDto } from './extended-reality.dto';
import { SocialMediaUrlDto } from './social-media-url.dto';
import { CommentDto } from './comment.dto';
import { EmotionDto } from './emotion.dto';

export class DestinationResponseDto implements Destination {
  @IsString()
  id!: string;

  @IsString()
  slug!: string;

  @IsBoolean()
  isPublic!: boolean;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => String)
  keywords: string[] = [];

  @IsISO8601()
  @IsOptional()
  datePublished?: string;

  @ValidateNested()
  @Type(() => LocationDto)
  @IsOptional()
  location?: LocationDto;

  @IsBoolean()
  useTitleImage!: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => String)
  text: string[] = [];

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

  @ValidateNested()
  @Type(() => ExtendedRealityDto)
  @IsOptional()
  extendedReality?: ExtendedRealityDto;

  @IsUrl()
  @IsOptional()
  websiteUrl?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SocialMediaUrlDto)
  socialMediaUrls: SocialMediaUrlDto[] = [];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CommentDto)
  comments: CommentDto[] = [];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EmotionDto)
  emotions: EmotionDto[] = [];
}
