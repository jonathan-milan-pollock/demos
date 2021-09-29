export const locationSchema = {
  place: { type: String, required: false },
  street: { type: String, required: false },
  city: { type: String, required: false },
  stateOrProvince: { type: String, required: false },
  zipCode: { type: String, required: false },
  country: { type: String, required: true, default: 'United States' },
};
