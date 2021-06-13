export const videoSchema = {
  entityId: { type: String, required: true },
  slug: { type: String, required: true },
  state: {
    type: String,
    enum: ['New', 'Public', 'Archived'],
    required: true,
  },
  order: { type: Number, required: true },
  isStared: { type: Boolean, required: true },
  title: { type: String, required: false },
  description: { type: String, required: false },
  keywords: { type: [String], required: true },
  dateCreated: { type: String, required: false },
  datePublished: { type: String, required: false },
};
