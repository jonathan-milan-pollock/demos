import { Location } from './location.interface';

export interface EventUpdate {
  readonly group: string;
  readonly slug: string;
  readonly isPublic: boolean;
  readonly title?: string;
  readonly description?: string;
  readonly keywords: ReadonlyArray<string>;
  readonly dateCreated?: string;
  readonly datePublished?: string;
  readonly location?: Location;
  readonly useTileImage: boolean;
  readonly text: ReadonlyArray<string>;
}
