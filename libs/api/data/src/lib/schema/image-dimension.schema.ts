import {
  ImageDimensionState,
  ImageDimensionType,
} from '@dark-rush-photography/shared-types';
import { mediaDimensionPixelsSchema } from './media-dimension-pixels.schema';
import { imageDimensionSettingsSchema } from './image-dimension-settings.schema';

export const imageDimensionSchema = {
  id: { type: String, required: false },
  entityId: { type: String, required: true },
  imageSlug: { type: String, required: true },
  type: {
    type: String,
    enum: Object.keys(ImageDimensionType),
    required: true,
  },
  state: {
    type: String,
    enum: Object.keys(ImageDimensionState),
    required: true,
  },
  pixels: { type: mediaDimensionPixelsSchema, required: true },
  settings: {
    type: imageDimensionSettingsSchema,
    required: true,
  },
};
