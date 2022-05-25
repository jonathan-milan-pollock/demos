import { EntityType } from '../enums/entity-type.enum';
import { ImagePublic } from './image-public.interface';
import { Dimension } from './dimension.interface';

export interface EntityMinimalPublic {
  readonly type: EntityType;
  readonly id: string;
  readonly group: string;
  readonly pathname: string;
  readonly order: number;
  readonly title?: string;
  readonly text?: string;
  readonly createdDate?: string;
  readonly publishedDate: string;
  readonly starredImageIsCentered: boolean;
  readonly starredImage?: ImagePublic;
  readonly tileDimension?: Dimension;
}
