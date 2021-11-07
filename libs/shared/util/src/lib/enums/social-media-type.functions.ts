import { ConflictException } from '@nestjs/common';

import { SocialMediaType } from '@dark-rush-photography/shared/types';

const socialMediaTypePlatformMap = new Map<SocialMediaType, string>([
  [SocialMediaType.Facebook, 'facebook'],
  [SocialMediaType.Instagram, 'instagram'],
  [SocialMediaType.LinkedIn, 'linkedin'],
  [SocialMediaType.GoogleBusiness, 'googleBusiness'],
  [SocialMediaType.YouTube, 'youtube'],
]);

export const getSocialMediaTypePlatform = (
  socialMediaType: SocialMediaType
): string => {
  const platform = socialMediaTypePlatformMap.get(socialMediaType);
  if (!platform)
    throw new ConflictException(
      `Could not get platform for social media type ${socialMediaType}`
    );
  return platform;
};
