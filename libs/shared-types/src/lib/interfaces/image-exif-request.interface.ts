import { Location } from './location';

export interface ImageExifRequest {
  keywords: Readonly<string[]>;
  title: string;
  location: Location;
  releaseDate?: Date;
}
