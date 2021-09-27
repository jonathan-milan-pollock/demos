import { ImageState } from '@dark-rush-photography/shared/types';

export const imageSchema = {
  id: { type: String, required: true },
  entityId: { type: String, required: true },
  state: {
    type: String,
    enum: Object.keys(ImageState),
    required: true,
  },
  blobPathId: { type: String, required: true },
  fileName: { type: String, required: true },
  order: { type: Number, required: true },
  isStarred: { type: Boolean, required: true },
  isLoved: { type: Boolean, required: true },
  title: { type: String, required: false },
  seoDescription: { type: String, required: false },
  seoKeywords: { type: String, required: false },
  dateCreated: { type: String, required: false },
  datePublished: { type: String, required: false },
  isThreeSixty: { type: Boolean, required: true },
};
