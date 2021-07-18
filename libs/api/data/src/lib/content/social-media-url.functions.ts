import { SocialMediaUrl } from '@dark-rush-photography/shared/types';

export const loadSocialMediaUrl = (
  socialMediaUrl: SocialMediaUrl
): SocialMediaUrl => {
  return {
    type: socialMediaUrl.type,
    url: socialMediaUrl.url,
  };
};
