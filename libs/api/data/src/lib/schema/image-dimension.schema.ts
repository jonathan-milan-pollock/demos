import { ImageDimensionType } from '@dark-rush-photography/shared/types';
import { resolutionSchema } from './resolution.schema';
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
  resolution: {
    type: resolutionSchema,
    required: true,
    default: { width: 0, height: 0 },
  },
  settings: {
    type: threeSixtySettingsSchema,
    required: true,
    default: { pitch: 0, roll: 0, yaw: 0, hfov: 0 },
  },
};
