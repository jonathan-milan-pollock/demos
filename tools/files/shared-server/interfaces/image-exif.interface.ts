import { Location } from './location';

export interface ImageExif {
  readonly title: string;
  readonly location: Location;
  readonly keywords: Set<string>;
  readonly releaseDate: Date;
}
