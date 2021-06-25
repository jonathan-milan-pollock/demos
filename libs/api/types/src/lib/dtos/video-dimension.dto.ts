import { IsEnum, IsMongoId, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import {
  VideoDimension,
  VideoDimensionState,
  VideoDimensionType,
} from '@dark-rush-photography/shared-types';
import { MediaDimensionPixelsDto } from './media-dimension-pixels.dto';

export class VideoDimensionDto implements VideoDimension {
  @IsUUID()
  id!: string;

  @IsMongoId()
  entityId!: string;

  @IsUUID()
  videoId!: string;

  @IsEnum(VideoDimensionType)
  type!: VideoDimensionType;

  @IsEnum(VideoDimensionState)
  state!: VideoDimensionState;

  @ValidateNested()
  @Type(() => MediaDimensionPixelsDto)
  pixels!: MediaDimensionPixelsDto;
}
