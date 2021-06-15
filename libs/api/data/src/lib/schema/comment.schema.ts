import { userSchema } from './user.schema';

export const commentSchema = {
  entityId: { type: String, required: true },
  mediaSlug: { type: String, required: false },
  id: { type: String, required: true },
  order: { type: Number, required: true },
  user: { type: userSchema, required: true },
  text: { type: String, required: true },
};
