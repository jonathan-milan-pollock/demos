import { SitemapEntityType } from '../enums/sitemap-entity-type.enum';

export interface PublishedDateSitemapEntityType {
  readonly publishedDate?: string;
  readonly sitemapEntityType: SitemapEntityType;
}
