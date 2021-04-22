import { SocialMediaType } from '../enums/social-media-type.enum';
import { Location } from './interfaces/location.i';
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
