import { IsEnum, IsMongoId, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import {
  ImageDimension,
  ImageDimensionType,
} from '@dark-rush-photography/shared/types';

import { ResolutionDto } from './resolution.dto';
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
  @Type(() => ResolutionDto)
  resolution!: ResolutionDto;

  @ValidateNested()
  @Type(() => ThreeSixtySettingsDto)
  threeSixtySettings!: ThreeSixtySettingsDto;
}
