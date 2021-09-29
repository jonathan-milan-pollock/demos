import { userSchema } from './user.schema';

export const commentSchema = {
  id: { type: String, required: true },
  entityId: { type: String, required: true },
  imageId: { type: String, required: false },
  order: { type: Number, required: true, default: 0 },
  user: { type: userSchema, required: true },
  text: { type: String, required: true },
};
