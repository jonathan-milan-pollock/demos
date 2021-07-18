import { Location } from './location.interface';
import { Image } from './image.interface';
import { ImageDimension } from './image-dimension.interface';
import { Video } from './video.interface';
import { VideoDimension } from './video-dimension.interface';
import { SocialMediaUrl } from './social-media-url.interface';
import { Comment } from './comment.interface';
import { Emotion } from './emotion.interface';

export interface Destination {
  readonly id?: string;
  readonly slug: string;
  readonly isPublic: boolean;
  readonly order: number;
  readonly title?: string;
  readonly description?: string;
  readonly keywords: string[];
  readonly location?: Location;
  readonly text: string[];
  readonly images: Image[];
  readonly imageDimensions: ImageDimension[];
  readonly videos: Video[];
  readonly videoDimensions: VideoDimension[];
  readonly hasExtendedReality: boolean;
  readonly websiteUrl?: string;
  readonly socialMediaUrls: SocialMediaUrl[];
  readonly comments: Comment[];
  readonly emotions: Emotion[];
}
