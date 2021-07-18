import { IsEnum, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { ImageDimensionType } from '../enums/image-dimension-type.enum';
import { MediaResolutionDto } from './media-resolution.dto';

export class ImageDimensionAddDto {
  @IsEnum(ImageDimensionType)
  type!: ImageDimensionType;

  @ValidateNested()
  @Type(() => MediaResolutionDto)
  resolution!: MediaResolutionDto;
}
