import { ImageState } from '../enums/image-state.enum';
import { Dimension } from './dimension.interface';

export interface Image {
  readonly id: string;
  readonly entityId: string;
  readonly storageId: string;
  readonly slug: string;
  readonly order: number;
  readonly state: ImageState;
  readonly threeSixtyImageStorageId?: string;
  readonly isStarred: boolean;
  readonly isLoved: boolean;
  readonly title?: string;
  readonly createdDate?: string;
  readonly seoDescription?: string;
  readonly seoKeywords?: string;
  readonly smallDimension?: Dimension;
}
