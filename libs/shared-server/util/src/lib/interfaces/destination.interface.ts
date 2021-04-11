import { SocialMediaType } from '../enums/social-media-type';
import { Location } from './location';
import { VisualMedia } from './visual-media';
import { FlyOver } from './fly-over';

export interface Destination {
  readonly slug: string;
  readonly name: string;
  readonly location: Location;
  readonly visualMedias: Readonly<VisualMedia[]>;
  readonly flyOver?: FlyOver;
  readonly socialMediaUrls: ReadonlyMap<SocialMediaType, string>;
}
