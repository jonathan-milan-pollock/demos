export const emotionSchema = {
  entityId: { type: String, required: true },
  mediaSlug: { type: String, required: false },
  commentId: { type: String, required: false },
  type: {
    type: String,
    enum: ['Like', 'Love', 'Care', 'Haha', 'Wow'],
    required: true,
  },
  userName: { type: String, required: true },
  userImage: { type: String, required: true },
};
