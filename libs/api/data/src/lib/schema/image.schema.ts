import { MediaState } from '@dark-rush-photography/shared/types';

export const imageSchema = {
  id: { type: String, required: true },
  entityId: { type: String, required: true },
  fileName: { type: String, required: true },
  state: {
    type: String,
    enum: Object.keys(MediaState),
    required: true,
  },
  order: { type: Number, required: true },
  isStarred: { type: Boolean, required: true },
  isLoved: { type: Boolean, required: true },
  title: { type: String, required: false },
  description: { type: String, required: false },
  keywords: { type: String, required: false },
  dateCreated: { type: String, required: false },
  datePublished: { type: String, required: false },
  isThreeSixty: { type: Boolean, required: true },
  skipExif: { type: Boolean, required: true },
  isGenerated: { type: Boolean, required: true },
  isProcessing: { type: Boolean, required: true },
};
