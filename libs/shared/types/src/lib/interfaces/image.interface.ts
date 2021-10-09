import { ImageState } from '../enums/image-state.enum';
import { Resolution } from './resolution.interface';

export interface Image {
  readonly id: string;
  readonly entityId: string;
  readonly storageId: string;
  readonly fileName: string;
  readonly state: ImageState;
  readonly order: number;
  readonly isStarred: boolean;
  readonly isLoved: boolean;
  readonly title?: string;
  readonly seoDescription?: string;
  readonly seoKeywords?: string;
  readonly dateCreated?: string;
  readonly datePublished?: string;
  readonly smallResolution: Resolution;
  readonly isThreeSixty: boolean;
}
