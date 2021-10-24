import {
  IsBoolean,
  IsInt,
  IsString,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { ImagePublic } from '@dark-rush-photography/shared/types';
import { ResolutionDto } from './resolution.dto';

export class ImagePublicDto implements ImagePublic {
  @IsUUID()
  storageId!: string;

  @IsString()
  fileName!: string;

  @IsBoolean()
  isThreeSixty!: boolean;

  @IsInt()
  @Min(0)
  order!: number;

  @ValidateNested()
  @Type(() => ResolutionDto)
  smallResolution!: ResolutionDto;
}
