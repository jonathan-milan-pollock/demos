import { IsEnum, IsMongoId, IsString } from 'class-validator';

import {
  ImageDimensionData,
  ImageDimensionType,
} from '@dark-rush-photography/shared-types';

export class ImageDimensionDataDto implements ImageDimensionData {
  @IsEnum(ImageDimensionType)
  type!: ImageDimensionType;

  @IsMongoId()
  entityId!: string;

  @IsString()
  slug!: string;

  @IsString()
  dataUri!: string;
}
