import { SocialMediaType } from '../enums/social-media-type';
import { Location } from './location';
import { VisualMedia } from './visual-media';
import { FlyOver } from './fly-over';

export interface AugmentedReality {
  readonly slug: string;
  readonly name: string;
  readonly location: Location;
  readonly url: string;
  readonly visualMedias: Readonly<VisualMedia[]>;
  readonly flyOver?: FlyOver;
  readonly socialMediaUrls: ReadonlyMap<SocialMediaType, string>;
}
