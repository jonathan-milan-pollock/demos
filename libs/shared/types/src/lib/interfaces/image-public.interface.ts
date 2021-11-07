import { Dimension } from './dimension.interface';

export interface ImagePublic {
  readonly storageId: string;
  readonly slug: string;
  readonly order: number;
  readonly isThreeSixtyImage: boolean;
  readonly threeSixtyImageStorageId?: string;
  readonly smallDimension: Dimension;
}
