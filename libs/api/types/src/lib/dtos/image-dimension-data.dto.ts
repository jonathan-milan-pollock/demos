import { IsEnum, IsMongoId, IsString, IsUUID } from 'class-validator';

import {
  ImageDimensionData,
  ImageDimensionType,
} from '@dark-rush-photography/shared/types';

export class ImageDimensionDataDto implements ImageDimensionData {
  @IsEnum(ImageDimensionType)
  type!: ImageDimensionType;

  @IsMongoId()
  entityId!: string;

  @IsUUID()
  imageId!: string;

  @IsString()
  dataUri!: string;
}
