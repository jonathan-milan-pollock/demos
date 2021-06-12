import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { LocationDto } from './location.dto';
import { ImageDto } from './image.dto';
import { VideoDto } from './video.dto';
import { FlyOverDto } from './fly-over.dto';
import { ExtendedRealityDto } from './extended-reality.dto';
import { SocialMediaDto } from './social-media.dto';
import { EmotionDto } from './emotion.dto';
import { CommentDto } from './comment.dto';

export class DestinationResponseDto {
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
  keywords: string[] = [];

  @IsDateString()
  @IsOptional()
  datePublished?: string;

  @ValidateNested()
  @Type(() => LocationDto)
  @IsOptional()
  location?: LocationDto;

  @IsBoolean()
  useTitleImage!: boolean;

  @IsArray()
  text: string[] = [];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImageDto)
  images: ImageDto[] = [];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VideoDto)
  videos: VideoDto[] = [];

  @ValidateNested()
  @Type(() => FlyOverDto)
  @IsOptional()
  flyOver?: FlyOverDto;

  @ValidateNested()
  @Type(() => ExtendedRealityDto)
  @IsOptional()
  extendedReality?: ExtendedRealityDto;

  @IsString()
  @IsOptional()
  websiteUrl?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SocialMediaDto)
  socialMediaUrls: SocialMediaDto[] = [];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EmotionDto)
  emotions: EmotionDto[] = [];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CommentDto)
  comments: CommentDto[] = [];
}
