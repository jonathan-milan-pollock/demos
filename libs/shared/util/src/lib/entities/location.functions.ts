import { Location } from '@dark-rush-photography/shared/types';

export const formatLocation = (location: Location): string => {
  let locationFormatted = location.place ?? '';

  if (location.city) {
    locationFormatted += locationFormatted
      ? `, ${location.city}`
      : location.city;
  }

  if (location.stateOrProvince) {
    locationFormatted += locationFormatted
      ? `, ${location.stateOrProvince}`
      : location.stateOrProvince;
  }

  locationFormatted += locationFormatted
    ? `, ${location.country}`
    : location.country;

  return locationFormatted;
};
