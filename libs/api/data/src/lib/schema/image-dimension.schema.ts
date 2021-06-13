import { mediaDimensionPixelsSchema } from './media-dimension-pixels.schema';
import { imageDimensionSettingsSchema } from './image-dimension-settings.schema';

export const imageDimensionSchema = {
  type: {
    type: String,
    enum: [
      'Tile',
      'Thumbnail',
      'Small',
      'Medium',
      'Large',
      'Facebook',
      'Instagram',
      'LinkedIn',
      'GoogleBusiness',
      'ThreeSixtyThumbnail',
      'ThreeSixtySmall',
      'ThreeSixtyMedium',
      'ThreeSixtyLarge',
      'ThreeSixtyFacebook',
      'ThreeSixtyInstagram',
      'ThreeSixtyLinkedIn',
      'ThreeSixtyGoogleBusiness',
    ],
  },
  state: {
    type: String,
    enum: [
      'added',
      'exifed',
      'posted',
      'social-media-posted',
      'tinified',
      'uploaded',
      'website-posted',
    ],
  },
  pixels: { type: mediaDimensionPixelsSchema, required: true },
  settings: {
    type: imageDimensionSettingsSchema,
    required: false,
  },
};
