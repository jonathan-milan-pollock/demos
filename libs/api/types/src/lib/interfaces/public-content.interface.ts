import {
  Comment,
  Emotion,
  Image,
  ImageDimension,
  Video,
  VideoDimension,
} from '@dark-rush-photography/shared/types';

export interface PublicContent {
  readonly images: Image[];
  readonly imageDimensions: ImageDimension[];
  readonly videos: Video[];
  readonly videoDimensions: VideoDimension[];
  readonly comments: Comment[];
  readonly emotions: Emotion[];
}
