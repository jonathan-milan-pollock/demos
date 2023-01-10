import { ImageState } from '../enums/image-state.enum';

export interface ImageAdmin {
  readonly id: string;
  readonly entityId: string;
  readonly storageId: string;
  readonly pathname: string;
  readonly order: number;
  readonly state: ImageState;
  readonly threeSixtyImageStorageId?: string;
  readonly isStarred: boolean;
  readonly isLoved: boolean;
  readonly title?: string;
  readonly seoDescription?: string;
  readonly seoKeywords: string[];
}