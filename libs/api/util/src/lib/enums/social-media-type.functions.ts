import { ConflictException } from '@nestjs/common';

import {
  ImageDimensionType,
  SocialMediaType,
} from '@dark-rush-photography/shared/types';

const socialMediaTypePlatformMap = new Map<SocialMediaType, string>([
  [SocialMediaType.Facebook, 'facebook'],
  [SocialMediaType.Instagram, 'instagram'],
  [SocialMediaType.LinkedIn, 'linkedin'],
  [SocialMediaType.GoogleBusiness, 'googleBusiness'],
  [SocialMediaType.YouTube, 'youtube'],
]);

const socialMediaTypeImageDimensionTypeMap = new Map<
  SocialMediaType,
  ImageDimensionType
>([
  [SocialMediaType.Facebook, ImageDimensionType.Facebook],
  [SocialMediaType.Instagram, ImageDimensionType.Instagram],
  [SocialMediaType.LinkedIn, ImageDimensionType.LinkedIn],
  [SocialMediaType.GoogleBusiness, ImageDimensionType.GoogleBusiness],
  [SocialMediaType.YouTube, ImageDimensionType.YouTube],
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

export const socialMediaTypeImageDimensionType = (
  socialMediaType: SocialMediaType
): ImageDimensionType => {
  const imageDimensionType =
    socialMediaTypeImageDimensionTypeMap.get(socialMediaType);
  if (!imageDimensionType)
    throw new ConflictException(
      `Could not get image dimension type for social media type ${socialMediaType}`
    );
  return imageDimensionType;
};
