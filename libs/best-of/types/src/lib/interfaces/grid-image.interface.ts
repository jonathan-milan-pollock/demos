import { Image } from './image.interface';

export interface GridImage extends Image {
  src: string;
  width: number;
  height: number;
}
