import { IsArray } from 'class-validator';
import { Type } from 'class-transformer';

import { ImageSelections } from '@dark-rush-photography/shared/types';

export class ImageSelectionsDto implements ImageSelections {
  @IsArray()
  @Type(() => String)
  imageIds: string[] = [];
}
