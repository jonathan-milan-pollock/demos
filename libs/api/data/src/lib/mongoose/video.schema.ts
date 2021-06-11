import { commentSchema } from './comment.schema';
import { emotionSchema } from './emotion.schema';

export const videoSchema = {
  slug: String,
  order: Number,
  isStared: Boolean,
  titleTrackPath: String,
  title: String,
  description: String,
  keywords: [String],
  dateCreated: String,
  datePublished: String,
  emotions: [emotionSchema],
  comments: [commentSchema],
};
