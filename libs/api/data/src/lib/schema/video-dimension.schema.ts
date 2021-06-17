import {
  VideoDimensionState,
  VideoDimensionType,
} from '@dark-rush-photography/shared-types';
import { mediaDimensionPixelsSchema } from './media-dimension-pixels.schema';
import { videoDimensionSettingsSchema } from './video-dimension-settings.schema';

export const videoDimensionSchema = {
  entityId: { type: String, required: true },
  videoSlug: { type: String, required: true },
  type: {
    type: String,
    enum: Object.keys(VideoDimensionType),
    required: true,
  },
  state: {
    type: String,
    enum: Object.keys(VideoDimensionState),
    required: true,
  },
  pixels: { type: mediaDimensionPixelsSchema, required: true },
  settings: {
    type: videoDimensionSettingsSchema,
    required: true,
  },
};
