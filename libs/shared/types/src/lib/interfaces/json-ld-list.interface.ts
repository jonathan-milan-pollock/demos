import { JsonLdListItem } from './json-ld-list-item.interface';

export interface JsonLdList {
  readonly '@context': string;
  readonly '@type': string;
  readonly itemListElement: JsonLdListItem[];
}
