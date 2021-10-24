import { ImageState } from '../enums/image-state.enum';
import { Resolution } from './resolution.interface';

export interface Image {
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
  readonly createdDate?: string;
  readonly seoDescription?: string;
  readonly seoKeywords?: string;
  readonly smallResolution?: Resolution;
}
