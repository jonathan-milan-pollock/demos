import { Image } from './image.interface';

export interface BestOf {
  readonly id?: string;
  readonly slug: string;
  readonly images: Image[];
}
