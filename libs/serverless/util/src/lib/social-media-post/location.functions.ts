import { Location } from '@dark-rush-photography/shared-types';

export const formatLocation = (location: Location): string => {
  let locationFormatted = '';
  if (location.place) {
    locationFormatted += location.place;
  }
  if (location.city) {
    locationFormatted += `, ${location.city}`;
  }
  if (location.stateOrProvince) {
    locationFormatted += `, ${location.stateOrProvince}`;
  }
  if (location.stateOrProvince) {
    locationFormatted += `, ${location.stateOrProvince}`;
  }
  locationFormatted += `, ${location.country}`;
  return locationFormatted;
};
