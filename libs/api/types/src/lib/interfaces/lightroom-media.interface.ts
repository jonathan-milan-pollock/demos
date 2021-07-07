import { EntityType } from '@dark-rush-photography/shared/types';

export interface LightroomMedia {
  readonly fileName: string;
  readonly entityType: EntityType;
  readonly entityGroup: string;
  readonly entitySlug: string;
}
