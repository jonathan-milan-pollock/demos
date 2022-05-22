import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { EntityIdOrderDto } from './entity-id-order.dto';
import { EntityOrders } from '@dark-rush-photography/shared/types';

export class EntityOrdersDto implements EntityOrders {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EntityIdOrderDto)
  entityIdOrders: EntityIdOrderDto[] = [];
}
