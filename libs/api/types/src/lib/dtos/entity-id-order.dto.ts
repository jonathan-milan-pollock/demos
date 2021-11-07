import { IsInt, IsMongoId, Min } from 'class-validator';

import { EntityIdOrder } from '@dark-rush-photography/shared/types';

export class EntityIdOrderDto implements EntityIdOrder {
  @IsMongoId()
  entityId!: string;

  @IsInt()
  @Min(0)
  order!: number;
}
