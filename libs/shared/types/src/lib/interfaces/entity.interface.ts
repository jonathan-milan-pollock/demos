import { EntityType } from '../enums/entity-type.enum';
import { WatermarkedType } from '../enums/watermarked-type.enum';
import { Location } from './location.interface';
import { Image } from './image.interface';
import { ImageVideo } from './image-video.interface';
import { Dimension } from './dimension.interface';

export interface Entity {
  readonly type: EntityType;
  readonly id?: string;
  readonly googleDriveFolderId?: string;
  readonly watermarkedType: WatermarkedType;
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
  readonly starredImageIsCentered: boolean;
  readonly images: Image[];
  readonly imageVideo?: ImageVideo;
  readonly tileDimension?: Dimension;
  readonly isDeleted: boolean;
}
