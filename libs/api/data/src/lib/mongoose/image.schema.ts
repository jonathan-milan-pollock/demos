import { imageDimensionSchema } from './image-dimension.schema';
import { emotionSchema } from './emotion.schema';
import { commentSchema } from './comment.schema';

export const imageSchema = {
  slug: String,
  order: Number,
  isStared: Boolean,
  isLoved: Boolean,
  isLiked: Boolean,
  title: String,
  description: String,
  keywords: [String],
  dateCreated: String,
  datePublished: String,
  imageDimensions: [imageDimensionSchema],
  emotions: [emotionSchema],
  comments: [commentSchema],
};
