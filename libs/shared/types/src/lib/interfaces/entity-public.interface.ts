import { EntityType } from '../enums/entity-type.enum';
import { Location } from './location.interface';
import { ImagePublic } from './image-public.interface';

export interface EntityPublic {
  readonly type: EntityType;
  readonly id: string;
  readonly group: string;
  readonly pathname: string;
  readonly order: number;
  readonly title?: string;
  readonly text?: string;
  readonly createdDate?: string;
  readonly publishedDate: string;
  readonly seoDescription?: string;
  readonly seoKeywords: string[];
  readonly location?: Location;
  readonly images: ImagePublic[];
}
