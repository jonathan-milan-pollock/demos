import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsISO8601,
  IsMongoId,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

import { Video, PostedState } from '@dark-rush-photography/shared-types';

export class VideoDto implements Video {
  @IsMongoId()
  id!: string;

  @IsMongoId()
  entityId!: string;

  @IsString()
  slug!: string;

  @IsEnum(PostedState)
  state!: PostedState;

  @IsInt()
  @Min(0)
  order!: number;

  @IsBoolean()
  isStared!: boolean;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  keywords?: string;

  @IsISO8601()
  dateCreated!: string;

  @IsISO8601()
  @IsOptional()
  datePublished?: string;
}
