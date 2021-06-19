import { IsArray, IsMongoId, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { Favorites } from '@dark-rush-photography/shared-types';
import { ImageDto } from './image.dto';
import { ImageDimensionDto } from './image-dimension.dto';
import { VideoDto } from './video.dto';
import { VideoDimensionDto } from './video-dimension.dto';
import { CommentDto } from './comment.dto';
import { EmotionDto } from './emotion.dto';

export class FavoritesDto implements Favorites {
  @IsMongoId()
  id!: string;

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

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CommentDto)
  comments: CommentDto[] = [];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EmotionDto)
  emotions: EmotionDto[] = [];
}
