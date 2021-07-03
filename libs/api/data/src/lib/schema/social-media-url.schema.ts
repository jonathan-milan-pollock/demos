import { SocialMediaType } from '@dark-rush-photography/shared/types';

export const socialMediaUrlSchema = {
  type: {
    type: String,
    enum: Object.keys(SocialMediaType),
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
};
