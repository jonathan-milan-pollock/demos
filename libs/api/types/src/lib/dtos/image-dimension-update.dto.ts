import { IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { ImageDimension } from '@dark-rush-photography/shared-types';
import { ThreeSixtyImageSettingsDto } from './three-sixty-image-settings.dto';

export class ImageDimensionUpdateDto implements Partial<ImageDimension> {
  @ValidateNested()
  @Type(() => ThreeSixtyImageSettingsDto)
  @IsOptional()
  threeSixtyImageSettings?: ThreeSixtyImageSettingsDto;
}
