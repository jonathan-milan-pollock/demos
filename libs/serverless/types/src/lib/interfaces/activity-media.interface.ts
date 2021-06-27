import { EntityType } from '@dark-rush-photography/shared-types';

export interface ActivityMedia {
  readonly fileName: string;
  readonly entityId?: string;
  readonly entityType: EntityType;
  readonly entityGroup?: string;
  readonly entitySlug: string;
}
