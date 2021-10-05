import { Image } from './image.interface';

export interface Favorites {
  readonly id?: string;
  readonly slug: string;
  readonly images: Image[];
}
