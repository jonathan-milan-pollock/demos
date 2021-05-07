import { SocialMediaType } from '../types/social-media.type';

export interface SocialMedia {
  readonly type: SocialMediaType;
  readonly url: string;
}
