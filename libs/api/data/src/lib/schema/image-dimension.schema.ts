import { imageDimensionPixelsSchema } from './image-dimension-pixels.schema';
import { threeSixtyImageSettingsSchema } from './three-sixty-image-settings.schema';

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
  imageDimensionPixels: { type: imageDimensionPixelsSchema, required: true },
  threeSixtyImageSettings: {
    type: threeSixtyImageSettingsSchema,
    required: false,
  },
};
