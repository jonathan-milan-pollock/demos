export const commentSchema = {
  entityId: String,
  imageSlug: { type: Boolean, required: false },
  order: Number,
  userName: String,
  userImage: String,
  text: String,
};
