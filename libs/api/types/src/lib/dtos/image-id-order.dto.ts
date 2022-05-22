import { IsInt, IsUUID, Min } from 'class-validator';

import { ImageIdOrder } from '@dark-rush-photography/shared/types';

export class ImageIdOrderDto implements ImageIdOrder {
  @IsUUID()
  imageId!: string;

  @IsInt()
  @Min(0)
  order!: number;
}
