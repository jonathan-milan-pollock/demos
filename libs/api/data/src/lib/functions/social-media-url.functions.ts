import { SocialMediaUrl } from '@dark-rush-photography/shared-types';

export const toSocialMediaUrl = (
  socialMediaUrl: SocialMediaUrl
): SocialMediaUrl => {
  return {
    type: socialMediaUrl.type,
    url: socialMediaUrl.url,
  };
};
