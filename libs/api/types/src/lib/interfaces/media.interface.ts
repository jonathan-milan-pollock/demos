import {
  EntityType,
  MediaState,
  MediaType,
} from '@dark-rush-photography/shared/types';

export interface Media {
  readonly type: MediaType;
  readonly id: string;
  readonly fileName: string;
  readonly state: MediaState;
  readonly entityType: EntityType;
  readonly entityId: string;
  readonly entityGroup: string;
  readonly entitySlug: string;
}
