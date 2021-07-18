import { IsEnum, IsMongoId, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { VideoDimensionType } from '../enums/video-dimension-type.enum';
import { VideoDimension } from '../interfaces/video-dimension.interface';
import { MediaResolutionDto } from './media-resolution.dto';

export class VideoDimensionDto implements VideoDimension {
  @IsUUID()
  id!: string;

  @IsMongoId()
  entityId!: string;

  @IsUUID()
  videoId!: string;

  @IsEnum(VideoDimensionType)
  type!: VideoDimensionType;

  @ValidateNested()
  @Type(() => MediaResolutionDto)
  resolution!: MediaResolutionDto;
}
