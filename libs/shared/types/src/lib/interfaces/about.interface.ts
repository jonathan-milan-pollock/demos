import { Image } from './image.interface';

export interface About {
  readonly id?: string;
  readonly slug: string;
  readonly order: number;
  readonly images: Image[];
}
