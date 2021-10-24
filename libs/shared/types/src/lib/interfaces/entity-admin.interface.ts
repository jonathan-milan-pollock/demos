import { EntityType } from '../enums/entity-type.enum';
import { Location } from './location.interface';
import { ImageAdmin } from './image-admin.interface';
import { ImageVideo } from './image-video.interface';
import { Resolution } from './resolution.interface';

export interface EntityAdmin {
  readonly type: EntityType;
  readonly id: string;
  readonly group: string;
  readonly slug: string;
  readonly order: number;
  readonly isPublic: boolean;
  readonly title?: string;
  readonly text?: string;
  readonly createdDate?: string;
  readonly publishedDate?: string;
  readonly seoDescription?: string;
  readonly seoKeywords: string[];
  readonly location?: Location;
  readonly hasStarredImage: boolean;
  readonly starredImageIsCentered: boolean;
  readonly starredImage?: ImageAdmin;
  readonly imageVideo?: ImageVideo;
  readonly tileDimension?: Resolution;
}
