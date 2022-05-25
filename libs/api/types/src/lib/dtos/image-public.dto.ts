import {
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { ImagePublic } from '@dark-rush-photography/shared/types';
import { DimensionDto } from './dimension.dto';

export class ImagePublicDto implements ImagePublic {
  @IsUUID()
  storageId!: string;

  @IsString()
  pathname!: string;

  @IsInt()
  @Min(0)
  order!: number;

  @IsString()
  @IsOptional()
  threeSixtyImageStorageId?: string;

  @ValidateNested()
  @Type(() => DimensionDto)
  smallDimension!: DimensionDto;
}
