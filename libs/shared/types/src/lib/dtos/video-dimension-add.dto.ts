import { IsEnum, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { VideoDimensionType } from '../enums/video-dimension-type.enum';
import { MediaResolutionDto } from './media-resolution.dto';

export class VideoDimensionAddDto {
  @IsEnum(VideoDimensionType)
  type!: VideoDimensionType;

  @ValidateNested()
  @Type(() => MediaResolutionDto)
  resolution!: MediaResolutionDto;
}
