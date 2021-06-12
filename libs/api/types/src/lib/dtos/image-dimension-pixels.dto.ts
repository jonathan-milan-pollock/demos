import { IsNumber } from 'class-validator';

import { ImageDimensionPixels } from '@dark-rush-photography/shared-types';

export class ImageDimensionPixelsDto implements ImageDimensionPixels {
  @IsNumber()
  width!: number;

  @IsNumber()
  height!: number;
}
