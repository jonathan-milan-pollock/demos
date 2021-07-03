import { IsEnum, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import {
  VideoDimensionAdd,
  VideoDimensionType,
} from '@dark-rush-photography/shared/types';
import { MediaDimensionPixelsDto } from './media-dimension-pixels.dto';

export class VideoDimensionAddDto implements VideoDimensionAdd {
  @IsEnum(VideoDimensionType)
  type!: VideoDimensionType;

  @ValidateNested()
  @Type(() => MediaDimensionPixelsDto)
  pixels!: MediaDimensionPixelsDto;
}
