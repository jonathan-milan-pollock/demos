import { EntityType } from '@dark-rush-photography/shared/types';

export const findGroupsUrl = (
  apiPrefix: string,
  entityType: EntityType
): string => {
  return `${apiPrefix}/api/v1/admin/entities/entity-type/${entityType}/groups`;
};
