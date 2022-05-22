import { EntityPublic } from './entity-public.interface';

export interface EntityFindOnePublicResponse {
  readonly publicEntity: EntityPublic;
  readonly eventJsonLdNewsArticle?: string;
}
