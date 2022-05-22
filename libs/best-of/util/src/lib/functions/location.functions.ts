import { Location } from '@dark-rush-photography/best-of/types';

export const loadAddressFromLocation = (location: Location) => {
  let formattedAddress = '';
  if (location.place) {
    formattedAddress = location.place;
  }

  if (location.city) {
    formattedAddress += formattedAddress ? `, ${location.city}` : location.city;
  }

  if (location.stateProvince) {
    formattedAddress += formattedAddress
      ? `, ${location.stateProvince}`
      : location.stateProvince;
  }

  if (location.country) {
    formattedAddress += formattedAddress
      ? `, ${location.country}`
      : location.country;
  }

  return formattedAddress;
};
