import { JsonLdListItem } from './json-ld-list-item.interface';

export interface JsonLdList {
  readonly '@context': 'https://schema.org';
  readonly '@type': 'ItemList';
  readonly itemListElement: JsonLdListItem[];
}
