import { EntityType } from '@dark-rush-photography/shared/types';

export const orderEntitiesUrl = (
  apiPrefix: string,
  entityType: EntityType,
  group?: string
): string => {
  if (
    entityType == EntityType.Event ||
    entityType == EntityType.PhotoOfTheWeek
  ) {
    return `${apiPrefix}/api/v1/admin/entities/entity-type/${entityType}/groups/${group}/order`;
  }
  return `${apiPrefix}/api/v1/admin/entities/entity-type/${entityType}/order`;
};

export const updateEntityUrl = (
  apiPrefix: string,
  entityId: string
): string => {
  return `${apiPrefix}/api/v1/admin/entities/${entityId}`;
};

export const publishEntityUrl = (
  apiPrefix: string,
  entityId: string,
  postSocialMedia: boolean
): string => {
  return `${apiPrefix}/api/v1/admin/entities/${entityId}/publish?postSocialMedia=${postSocialMedia}`;
};

export const findAllEntitiesUrl = (
  apiPrefix: string,
  entityType: EntityType,
  group?: string
): string => {
  if (
    entityType == EntityType.Event ||
    entityType == EntityType.PhotoOfTheWeek
  ) {
    return `${apiPrefix}/api/v1/admin/entities/entity-type/${entityType}/groups/${group}`;
  }

  return `${apiPrefix}/api/v1/admin/entities/entity-type/${entityType}`;
};

export const findOneEntityUrl = (
  apiPrefix: string,
  entityId: string
): string => {
  return `${apiPrefix}/api/v1/admin/entities/${entityId}`;
};

export const deleteEntityUrl = (
  apiPrefix: string,
  entityId: string
): string => {
  return `${apiPrefix}/api/v1/admin/entities/${entityId}`;
};
