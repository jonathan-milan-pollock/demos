import {
  IsArray,
  IsBoolean,
  IsInt,
  IsMongoId,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { ThreeSixtySettingsDto } from './three-sixty-settings.dto';
import { CommentDto } from './comment.dto';
import { EmotionDto } from './emotion.dto';

export class VideoDto {
  @IsUUID()
  id!: string;

  @IsMongoId()
  entityId!: string;

  @IsString()
  fileName!: string;

  @IsInt()
  @Min(0)
  order!: number;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  keywords?: string;

  @IsBoolean()
  isThreeSixty!: boolean;

  @ValidateNested()
  @Type(() => ThreeSixtySettingsDto)
  @IsOptional()
  threeSixtySettings?: ThreeSixtySettingsDto;

  @IsUrl()
  @IsOptional()
  hlsUrl?: string;

  @IsBoolean()
  isFlyOver!: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CommentDto)
  comments: CommentDto[] = [];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EmotionDto)
  emotions: EmotionDto[] = [];
}
