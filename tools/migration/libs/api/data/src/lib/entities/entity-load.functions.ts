import { Dimension, Location } from '@dark-rush-photography/shared/types';

export const loadLocation = (location?: Location): Location | undefined => {
  if (!location) return location;

  return {
    place: location.place,
    city: location.city,
    stateOrProvince: location.stateOrProvince,
    country: location.country,
  };
};

export const loadTileDimension = (
  tileDimension?: Dimension
): Dimension | undefined => {
  if (!tileDimension) return tileDimension;

  return { width: tileDimension.width, height: tileDimension.height };
};
