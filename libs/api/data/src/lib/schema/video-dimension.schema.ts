import { VideoDimensionType } from '@dark-rush-photography/shared/types';
import { mediaDimensionPixelsSchema } from './media-dimension-pixels.schema';

export const videoDimensionSchema = {
  id: { type: String, required: false },
  entityId: { type: String, required: true },
  videoSlug: { type: String, required: true },
  type: {
    type: String,
    enum: Object.keys(VideoDimensionType),
    required: true,
  },
  pixels: { type: mediaDimensionPixelsSchema, required: true },
};
