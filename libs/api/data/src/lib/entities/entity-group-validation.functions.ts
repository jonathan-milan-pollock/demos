import { BadRequestException } from '@nestjs/common';

import { EntityType } from '@dark-rush-photography/shared/types';
import { getEntityHasGroup } from '@dark-rush-photography/api/util';

export const validateEntityDoesNotRequireGroup = (
  entityType: EntityType
): void => {
  if (getEntityHasGroup(entityType)) {
    throw new BadRequestException(`Entity type ${entityType} requires a group`);
  }
};

export const validateEntityGroupProvided = (group?: string): string => {
  if (!group) {
    throw new BadRequestException('A group must be provided');
  }
  return group;
};
