export const socialMediaUrlSchema = {
  type: {
    type: String,
    enum: ['Facebook', 'Instagram', 'LinkedIn', 'GoogleBusiness', 'YouTube'],
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
};
