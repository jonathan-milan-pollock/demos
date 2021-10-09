import { SitemapEntityType } from '../enums/sitemap-entity-type.enum';

export interface DatePublishedSitemapEntityType {
  readonly datePublished?: string;
  readonly sitemapEntityType: SitemapEntityType;
}
