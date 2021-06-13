export const commentSchema = {
  entityId: { type: String, required: true },
  mediaSlug: { type: String, required: false },
  id: { type: String, required: true },
  order: { type: Number, required: true },
  userName: { type: String, required: true },
  userImage: { type: String, required: true },
  text: { type: String, required: true },
};
