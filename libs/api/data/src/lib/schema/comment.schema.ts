import { userSchema } from './user.schema';

export const commentSchema = {
  id: { type: String, required: false },
  entityId: { type: String, required: true },
  mediaId: { type: String, required: false },
  order: { type: Number, required: true },
  user: { type: userSchema, required: true },
  text: { type: String, required: true },
};
