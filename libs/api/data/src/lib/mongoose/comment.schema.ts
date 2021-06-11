import { emotionSchema } from './emotion.schema';

export const commentSchema = {
  order: Number,
  userName: String,
  userImage: String,
  text: String,
  emotions: [emotionSchema],
};
