import { IsEnum, IsMongoId, IsString } from 'class-validator';

import {
  VideoDimensionData,
  VideoDimensionType,
} from '@dark-rush-photography/shared-types';

export class VideoDimensionDataDto implements VideoDimensionData {
  @IsEnum(VideoDimensionType)
  type!: VideoDimensionType;

  @IsMongoId()
  entityId!: string;

  @IsString()
  videoSlug!: string;

  @IsString()
  dataUri!: string;
}
