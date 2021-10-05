import { Image } from './image.interface';

export interface ImagePost {
  readonly id?: string;
  readonly title?: string;
  readonly text: string[];
  readonly images: Image[];
}
