import { ImageState } from '@dark-rush-photography/shared/types';
import { dimensionSchema } from './dimension.schema';

export const imageSchema = {
  id: { type: String, required: true },
  entityId: { type: String, required: true },
  storageId: { type: String, required: true },
  slug: { type: String, required: true },
  order: { type: Number, required: true, default: 0 },
  state: {
    type: String,
    enum: Object.keys(ImageState),
    required: true,
  },
  isThreeSixtyImage: { type: Boolean, required: true, default: false },
  threeSixtyImageStorageId: { type: String, required: false },
  isStarred: { type: Boolean, required: true, default: false },
  isLoved: { type: Boolean, required: true, default: false },
  title: { type: String, required: false },
  createdDate: { type: String, required: false },
  seoDescription: { type: String, required: false },
  seoKeywords: { type: String, required: false },
  smallDimension: {
    type: dimensionSchema,
    required: false,
  },
};
