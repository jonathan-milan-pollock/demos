import { EntityType } from '../enums/entity-type.enum';
import { LocationDefined } from './location-defined.interface';
import { ImagePublic } from './image-public.interface';

export interface EntityPublic {
  readonly type: EntityType;
  readonly group: string;
  readonly slug: string;
  readonly order: number;
  readonly title: string;
  readonly seoDescription: string;
  readonly seoKeywords: string[];
  readonly dateCreated: string;
  readonly datePublished: string;
  readonly location: LocationDefined;
  readonly text: string[];
  readonly images: ImagePublic[];
}
