import { MediaState } from '@dark-rush-photography/shared/types';

export const videoSchema = {
  id: { type: String, required: false },
  entityId: { type: String, required: true },
  fileName: { type: String, required: true },
  state: {
    type: String,
    enum: Object.keys(MediaState),
    required: true,
  },
  order: { type: Number, required: true },
  isStared: { type: Boolean, required: true },
  title: { type: String, required: false },
  description: { type: String, required: false },
  keywords: { type: String, required: false },
  dateCreated: { type: String, required: true },
  datePublished: { type: String, required: false },
};
