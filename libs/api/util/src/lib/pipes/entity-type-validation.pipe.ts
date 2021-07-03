import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

import { EntityType } from '@dark-rush-photography/shared/types';

@Injectable()
export class EntityTypeValidationPipe
  implements PipeTransform<string, EntityType> {
  transform(entityType: string): EntityType {
    const entityTypeKey = Object.keys(EntityType).find(
      (b) => b.toLowerCase() == entityType.toLowerCase()
    );
    if (!entityTypeKey) {
      throw new BadRequestException(`Invalid Entity Type ${entityType}`);
    }
    return entityTypeKey as EntityType;
  }
}
