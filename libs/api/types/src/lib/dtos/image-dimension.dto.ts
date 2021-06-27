import {
  IsEnum,
  IsMongoId,
  IsOptional,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import {
  ImageDimension,
  ImageDimensionType,
} from '@dark-rush-photography/shared-types';
import { MediaDimensionPixelsDto } from './media-dimension-pixels.dto';
import { ThreeSixtyImageSettingsDto } from './three-sixty-image-settings.dto';

export class ImageDimensionDto implements ImageDimension {
  @IsUUID()
  id!: string;

  @IsMongoId()
  entityId!: string;

  @IsUUID()
  imageId!: string;

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
