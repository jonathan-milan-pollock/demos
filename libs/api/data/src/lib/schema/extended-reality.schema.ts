import { geoCoordinatesSchema } from './geo-coordinates.schema';

export const extendedRealitySchema = {
  slug: String,
  geo: geoCoordinatesSchema,
};
