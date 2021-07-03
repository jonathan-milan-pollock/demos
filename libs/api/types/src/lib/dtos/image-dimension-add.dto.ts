import { IsEnum, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import {
  ImageDimensionAdd,
  ImageDimensionType,
} from '@dark-rush-photography/shared/types';
import { MediaDimensionPixelsDto } from './media-dimension-pixels.dto';
import { ThreeSixtyImageSettingsDto } from './three-sixty-image-settings.dto';

export class ImageDimensionAddDto implements ImageDimensionAdd {
  @IsEnum(ImageDimensionType)
  type!: ImageDimensionType;

  @ValidateNested()
  @Type(() => MediaDimensionPixelsDto)
  pixels!: MediaDimensionPixelsDto;

  @ValidateNested()
  @Type(() => ThreeSixtyImageSettingsDto)
  @IsOptional()
  threeSixtyImageSettings?: ThreeSixtyImageSettingsDto;
}
