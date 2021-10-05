import { Image } from './image.interface';

export interface Destination {
  readonly id?: string;
  readonly slug: string;
  readonly images: Image[];
}
