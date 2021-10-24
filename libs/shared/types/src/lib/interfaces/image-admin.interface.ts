import { ImageState } from '../enums/image-state.enum';

export interface ImageAdmin {
  readonly id: string;
  readonly entityId: string;
  readonly storageId: string;
  readonly fileName: string;
  readonly state: ImageState;
  readonly isThreeSixty: boolean;
  readonly order: number;
  readonly isStarred: boolean;
  readonly isLoved: boolean;
  readonly title?: string;
  readonly seoDescription?: string;
  readonly seoKeywords: string[];
}
