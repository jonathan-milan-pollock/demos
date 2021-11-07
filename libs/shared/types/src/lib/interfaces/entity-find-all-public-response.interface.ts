import { EntityMinimalPublic } from './entity-minimal-public.interface';

export interface EntityFindAllPublicResponse {
  readonly minimalPublicEntities: EntityMinimalPublic[];
  readonly eventsJsonLdList?: string;
}
