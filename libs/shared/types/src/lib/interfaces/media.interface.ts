import { EntityType } from '../enums/entity-type.enum';
import { MediaState } from '../enums/media-state.enum';
import { MediaType } from '../enums/media-type.enum';

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
