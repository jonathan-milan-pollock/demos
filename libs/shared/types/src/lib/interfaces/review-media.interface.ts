import { Image } from './image.interface';

export interface ReviewMedia {
  readonly id?: string;
  readonly images: Image[];
}
