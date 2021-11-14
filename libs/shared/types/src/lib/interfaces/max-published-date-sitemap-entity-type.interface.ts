import { SitemapEntityType } from '../enums/sitemap-entity-type.enum';

export interface MaxPublishedDateSitemapEntityType {
  readonly maxPublishedDate: string;
  readonly sitemapEntityType: SitemapEntityType;
}
