import { SocialMediaType } from '../enums/social-media-type.enum';

export interface SocialMediaUrl {
  readonly type: SocialMediaType;
  readonly url: string;
}
