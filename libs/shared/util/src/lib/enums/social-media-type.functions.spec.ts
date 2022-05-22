import { ConflictException } from '@nestjs/common';

import faker from '@faker-js/faker';

import { SocialMediaType } from '@dark-rush-photography/shared/types';
import { getSocialMediaTypePlatform } from './social-media-type.functions';

describe('social-media-type.functions', () => {
  describe('getSocialMediaTypePlatform', () => {
    const socialMediaTypePlatforms: {
      socialMediaType: SocialMediaType;
      platform: string;
    }[] = [
      {
        socialMediaType: SocialMediaType.Facebook,
        platform: 'facebook',
      },
      {
        socialMediaType: SocialMediaType.Instagram,
        platform: 'instagram',
      },
      {
        socialMediaType: SocialMediaType.LinkedIn,
        platform: 'linkedin',
      },
      {
        socialMediaType: SocialMediaType.GoogleBusiness,
        platform: 'googleBusiness',
      },
      {
        socialMediaType: SocialMediaType.YouTube,
        platform: 'youtube',
      },
    ];

    it.each(socialMediaTypePlatforms)(
      'should return platform %s',
      ({ socialMediaType, platform }) => {
        expect(getSocialMediaTypePlatform(socialMediaType)).toBe(platform);
      }
    );

    it('should throw a conflict exception if cannot get platform', () => {
      const socialMediaType = faker.lorem.word() as SocialMediaType;
      const result = () => {
        getSocialMediaTypePlatform(socialMediaType);
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow(
        `Could not get platform for social media type ${socialMediaType}`
      );
    });

    it.each(Object.values(SocialMediaType))(
      'should not throw for any social media type %s',
      (socialMediaType) => {
        const result = () => {
          getSocialMediaTypePlatform(socialMediaType);
        };
        expect(result).not.toThrow();
      }
    );
  });
});
