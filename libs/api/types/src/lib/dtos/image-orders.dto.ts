import { IsArray } from 'class-validator';
import { Type } from 'class-transformer';

import { ImageOrders } from '@dark-rush-photography/shared/types';

export class ImageOrdersDto implements ImageOrders {
  @IsArray()
  @Type(() => String)
  imageIds: string[] = [];
}
