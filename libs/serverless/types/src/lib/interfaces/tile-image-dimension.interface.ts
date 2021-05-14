import { ImageDimension } from './image-dimension.interface';

export interface TileImageDimension extends ImageDimension {
  readonly minWidth: number;
  readonly minHeight: number;
  readonly longestEdge: number;
}
