import { Image } from './image.interface';
import { Location } from './location.interface';

export interface PhotoOfTheWeek {
  readonly id?: string;
  // identifier
  readonly slug: string;
  readonly group: number;
  // location
  readonly location?: Location;
  // display
  readonly useTitleImage: boolean;
  // content
  readonly images: ReadonlyArray<Image>;
}
