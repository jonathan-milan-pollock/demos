import { EntityType } from '../enums/entity-type.enum';
import { ImagePublic } from './image-public.interface';
import { Resolution } from './resolution.interface';

export interface EntityMinimalPublic {
  readonly type: EntityType;
  readonly group: string;
  readonly slug: string;
  readonly order: number;
  readonly title?: string;
  readonly text?: string;
  readonly createdDate?: string;
  readonly publishedDate: string;
  readonly hasStarredImage: boolean;
  readonly starredImageIsCentered: boolean;
  readonly starredImage?: ImagePublic;
  readonly tileDimension?: Resolution;
}
