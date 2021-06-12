export const socialMediaSchema = {
  type: {
    type: String,
    enum: ['Facebook', 'Instagram', 'LinkedIn', 'GoogleBusiness', 'YouTube'],
  },
  url: String,
};
