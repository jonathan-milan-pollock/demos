import { IsArray } from 'class-validator';
import { Type } from 'class-transformer';

import { EntityOrders } from '@dark-rush-photography/shared/types';

export class EntityOrdersDto implements EntityOrders {
  @IsArray()
  @Type(() => String)
  entityIds: string[] = [];
}
