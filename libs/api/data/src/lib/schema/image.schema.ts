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
  isStared: { type: Boolean, required: true },
  isLoved: { type: Boolean, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  keywords: { type: String, required: true },
  dateCreated: { type: String, required: true },
  datePublished: { type: String, required: true },
  isGenerated: { type: Boolean, required: true },
  isProcessing: { type: Boolean, required: true },
};
