import { mediaDimensionPixelsSchema } from './media-dimension-pixels.schema';
import { videoDimensionSettingsSchema } from './video-dimension-settings.schema';

export const videoDimensionSchema = {
  entityId: { type: String, required: true },
  videoSlug: { type: String, required: true },
  type: {
    type: String,
    enum: [
      'Thumbnail',
      'Small',
      'Medium',
      'Large',
      'Facebook',
      'Instagram',
      'LinkedIn',
      'GoogleBusiness',
      'YouTube',
      'ThreeSixtyThumbnail',
      'ThreeSixtySmall',
      'ThreeSixtyMedium',
      'ThreeSixtyLarge',
      'ThreeSixtyFacebook',
      'ThreeSixtyInstagram',
      'ThreeSixtyLinkedIn',
      'ThreeSixtyGoogleBusiness',
      'ThreeSixtyYouTube',
    ],
    required: true,
  },
  state: {
    type: String,
    enum: [
      'added',
      'exifed',
      'posted',
      'resized',
      'social-media-posted',
      'uploaded',
      'website-posted',
    ],
    required: true,
  },
  pixels: { type: mediaDimensionPixelsSchema, required: true },
  settings: {
    type: videoDimensionSettingsSchema,
    required: true,
  },
};
