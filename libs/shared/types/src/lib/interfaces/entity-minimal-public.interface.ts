import { EntityType } from '../enums/entity-type.enum';
import { ImagePublic } from './image-public.interface';

export interface EntityMinimalPublic {
  readonly type: EntityType;
  readonly group: string;
  readonly slug: string;
  readonly order: number;
  readonly title: string;
  readonly dateCreated: string;
  readonly datePublished: string;
  readonly hasStarredImage: boolean;
  readonly starredImageIsCentered: boolean;
  readonly starredImage: ImagePublic;
}
