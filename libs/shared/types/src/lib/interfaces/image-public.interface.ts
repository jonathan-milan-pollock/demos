import { Dimension } from './dimension.interface';

export interface ImagePublic {
  readonly storageId: string;
  readonly pathname: string;
  readonly order: number;
  readonly threeSixtyImageStorageId?: string;
  readonly smallDimension: Dimension;
}
