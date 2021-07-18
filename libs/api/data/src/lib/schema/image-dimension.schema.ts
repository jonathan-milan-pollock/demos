import { ImageDimensionType } from '@dark-rush-photography/shared/types';
import { mediaResolutionSchema } from './media-resolution.schema';
import { threeSixtySettingsSchema } from './three-sixty-settings.schema';

export const imageDimensionSchema = {
  id: { type: String, required: true },
  entityId: { type: String, required: true },
  imageId: { type: String, required: true },
  type: {
    type: String,
    enum: Object.keys(ImageDimensionType),
    required: true,
  },
  resolution: { type: mediaResolutionSchema, required: true },
  settings: {
    type: threeSixtySettingsSchema,
    required: false,
  },
};
