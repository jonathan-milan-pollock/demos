import { EntityType } from '../enums/entity-type.enum';
import { WatermarkedType } from '../enums/watermarked-type.enum';
import { LocationDefined } from './location-defined.interface';
import { ImageAdmin } from './image-admin.interface';
import { Video } from './video.interface';

export interface EntityAdmin {
  readonly type: EntityType;
  readonly id: string;
  readonly watermarkedType: WatermarkedType;
  readonly group: string;
  readonly slug: string;
  readonly order: number;
  readonly title: string;
  readonly seoDescription: string;
  readonly seoKeywords: string[];
  readonly dateCreated: string;
  readonly datePublished: string;
  readonly location: LocationDefined;
  readonly starredImageIsCentered: boolean;
  readonly text: string[];
  readonly images: ImageAdmin[];
  readonly videos: Video[];
  readonly isPublic: boolean;
  readonly isPublished: boolean;
  readonly isProcessing: boolean;
}
