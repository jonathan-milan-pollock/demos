import { SocialMediaType } from '../enums/social-media-type.enum';

export interface SocialMedia {
  readonly type: SocialMediaType;
  readonly url: string;
}
