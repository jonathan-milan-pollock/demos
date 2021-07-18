import { VideoDimensionType } from '@dark-rush-photography/shared/types';
import { mediaResolutionSchema } from './media-resolution.schema';

export const videoDimensionSchema = {
  id: { type: String, required: true },
  entityId: { type: String, required: true },
  videoId: { type: String, required: true },
  type: {
    type: String,
    enum: Object.keys(VideoDimensionType),
    required: true,
  },
  resolution: { type: mediaResolutionSchema, required: true },
};
