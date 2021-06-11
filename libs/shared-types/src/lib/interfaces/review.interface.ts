import { Image } from './image.interface';

export interface Review {
  readonly id?: string;
  readonly title: string;
  readonly text: ReadonlyArray<string>;
  readonly image: Image;
}
