import { BestOfType } from '../enums/best-of-type.enum';
import { Image } from './image.interface';

export interface BestOf {
  readonly id?: string;
  readonly bestOfType?: BestOfType;
  readonly images: ReadonlyArray<Image>;
}
