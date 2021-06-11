import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsDefined,
  IsOptional,
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

export class CreateDestinationDto {
  @IsDefined()
  slug!: string;

  isPublic!: boolean;

  @IsDefined()
  title!: string;

  @IsDefined()
  description!: string;

  @IsArray()
  @IsDefined()
  keywords!: string[];

  @IsDateString()
  dateCreated!: string;

  @IsDateString()
  @IsOptional()
  datePublished?: string;

  @ValidateNested({ each: true })
  @Type(() => LocationDto)
  location!: LocationDto;

  @IsBoolean()
  useTitleImage!: boolean;

  @IsArray()
  text!: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImageDto)
  images!: ImageDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VideoDto)
  videos!: VideoDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => FlyOverDto)
  flyOver?: FlyOverDto;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ExtendedRealityDto)
  extendedReality?: ExtendedRealityDto;

  @IsArray()
  websiteUrls!: ReadonlyArray<string>;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SocialMediaDto)
  socialMediaUrls!: SocialMediaDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EmotionDto)
  emotions!: EmotionDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CommentDto)
  comments!: CommentDto[];
}
