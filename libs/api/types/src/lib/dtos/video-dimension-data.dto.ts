import { IsEnum, IsMongoId, IsString, IsUUID } from 'class-validator';

import {
  VideoDimensionData,
  VideoDimensionType,
} from '@dark-rush-photography/shared/types';

export class VideoDimensionDataDto implements VideoDimensionData {
  @IsEnum(VideoDimensionType)
  type!: VideoDimensionType;

  @IsMongoId()
  entityId!: string;

  @IsUUID()
  videoId!: string;

  @IsString()
  dataUri!: string;
}
