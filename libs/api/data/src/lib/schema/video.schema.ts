import { MediaState } from '@dark-rush-photography/shared/types';
import { threeSixtySettingsSchema } from './three-sixty-settings.schema';

export const videoSchema = {
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
  title: { type: String, required: false },
  description: { type: String, required: false },
  keywords: { type: String, required: false },
  dateCreated: { type: String, required: false },
  datePublished: { type: String, required: false },
  isThreeSixty: { type: Boolean, required: true },
  settings: {
    type: threeSixtySettingsSchema,
    required: false,
  },
  coverImageId: { type: String, required: false },
  hlsUrl: { type: String, required: false },
  isFlyOver: { type: Boolean, required: true },
  isUploaded: { type: Boolean, required: true },
  isGenerated: { type: Boolean, required: true },
  isProcessing: { type: Boolean, required: true },
};
