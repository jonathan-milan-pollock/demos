import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { ImageOrders } from '@dark-rush-photography/shared/types';
import { ImageIdOrderDto } from './image-id-order.dto';

export class ImageOrdersDto implements ImageOrders {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImageIdOrderDto)
  imageIdOrders: ImageIdOrderDto[] = [];
}
