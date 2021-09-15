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
} from '@dark-rush-photography/shared/types';

import { MediaResolutionDto } from './media-resolution.dto';
import { ThreeSixtySettingsDto } from './three-sixty-settings.dto';

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
  @Type(() => MediaResolutionDto)
  resolution!: MediaResolutionDto;

  @ValidateNested()
  @Type(() => ThreeSixtySettingsDto)
  @IsOptional()
  threeSixtySettings?: ThreeSixtySettingsDto;
}
