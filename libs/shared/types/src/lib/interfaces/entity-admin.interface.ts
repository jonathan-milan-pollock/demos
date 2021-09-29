import { EntityType } from '../enums/entity-type.enum';
import { WatermarkedType } from '../enums/watermarked-type.enum';
import { LocationPublic } from './location-public.interface';
import { ImageAdmin } from './image-admin.interface';
import { ImageDimension } from './image-dimension.interface';
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
  readonly location: LocationPublic;
  readonly starredImageIsCentered: boolean;
  readonly text: string[];
  readonly images: ImageAdmin[];
  readonly imageDimensions: ImageDimension[];
  readonly videos: Video[];
  readonly isPublic: boolean;
  readonly isPublishing: boolean;
  readonly isPublished: boolean;
}
