import { Image } from './image.interface';

export interface About {
  readonly slug: string;
  readonly isPublic: boolean;
  readonly name: string;
  readonly text: ReadonlyArray<string>;
  readonly images: ReadonlyArray<Image>;
}
