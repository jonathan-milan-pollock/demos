import { EmotionType } from '@dark-rush-photography/shared/types';
import { userSchema } from './user.schema';

export const emotionSchema = {
  id: { type: String, required: true },
  entityId: { type: String, required: true },
  imageId: { type: String, required: false },
  commentId: { type: String, required: false },
  type: {
    type: String,
    enum: Object.keys(EmotionType),
    required: true,
  },
  user: { type: userSchema, required: true },
};
