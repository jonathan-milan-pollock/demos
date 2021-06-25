import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsISO8601,
  IsMongoId,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

import { Image, PostedState } from '@dark-rush-photography/shared-types';

export class ImageDto implements Image {
  @IsUUID()
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

  @IsBoolean()
  isLoved!: boolean;

  @IsBoolean()
  isLiked!: boolean;

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
