import {
  DEFAULT_ENTITY_GROUP,
  EntityType,
} from '@dark-rush-photography/shared/types';

export const foundEntityLogMessage = (
  entityFolderName: string,
  entityType: EntityType,
  group: string,
  slug?: string
): string => {
  return `Found ${entityType} entity ${
    group !== DEFAULT_ENTITY_GROUP ? `${group} ` : ''
  }${slug ?? entityFolderName}`;
};

export const creatingEntityLogMessage = (
  entityFolderName: string,
  entityType: EntityType,
  group: string,
  slug?: string
): string => {
  return `Creating ${entityType} entity ${
    group !== DEFAULT_ENTITY_GROUP ? `${group} ` : ''
  }${slug ?? entityFolderName}`;
};
