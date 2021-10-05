import { ImageState } from '@dark-rush-photography/shared/types';
import { resolutionSchema } from './resolution.schema';

export const imageSchema = {
  id: { type: String, required: true },
  entityId: { type: String, required: true },
  storageId: { type: String, required: true },
  fileName: { type: String, required: true },
  state: {
    type: String,
    enum: Object.keys(ImageState),
    required: true,
  },
  order: { type: Number, required: true, default: 0 },
  isStarred: { type: Boolean, required: true, default: false },
  isLoved: { type: Boolean, required: true, default: false },
  title: { type: String, required: false },
  seoDescription: { type: String, required: false },
  seoKeywords: { type: String, required: false },
  dateCreated: { type: String, required: false },
  datePublished: { type: String, required: false },
  smallResolution: {
    type: resolutionSchema,
    required: true,
    default: { width: 0, height: 0 },
  },
  isThreeSixty: { type: Boolean, required: true, default: false },
};
