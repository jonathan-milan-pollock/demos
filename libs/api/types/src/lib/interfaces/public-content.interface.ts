import {
  Comment,
  Emotion,
  Image,
  ImageDimension,
} from '@dark-rush-photography/shared/types';

export interface PublicContent {
  readonly images: Image[];
  readonly imageDimensions: ImageDimension[];
  readonly comments: Comment[];
  readonly emotions: Emotion[];
}
