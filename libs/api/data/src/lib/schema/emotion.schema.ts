export const emotionSchema = {
  type: {
    type: String,
    enum: ['Like', 'Love', 'Care', 'Haha', 'Wow'],
  },
  userName: String,
  userImage: String,
};
