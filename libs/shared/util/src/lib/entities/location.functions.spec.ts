import * as faker from 'faker';

import { Location } from '@dark-rush-photography/shared/types';
import { formatLocation } from './location.functions';

describe('location.functions', () => {
  describe('formatLocation', () => {
    const location: Location = {
      place: faker.company.companyName(),
      city: faker.address.city(),
      stateOrProvince: faker.address.state(),
      country: faker.address.country(),
    };

    it('should format all values of a location', () => {
      const result = formatLocation(location);
      expect(result).toBe(
        `${location.place}, ${location.city}, ${location.stateOrProvince}, ${location.country}`
      );
    });

    it('should format a location without a place', () => {
      const result = formatLocation({ ...location, place: undefined });
      expect(result).toBe(
        `${location.city}, ${location.stateOrProvince}, ${location.country}`
      );
    });

    it('should format a location without a city', () => {
      const result = formatLocation({ ...location, city: undefined });
      expect(result).toBe(
        `${location.place}, ${location.stateOrProvince}, ${location.country}`
      );
    });

    it('should format a location without a place or city', () => {
      const result = formatLocation({
        ...location,
        place: undefined,
        city: undefined,
      });
      expect(result).toBe(`${location.stateOrProvince}, ${location.country}`);
    });

    it('should format a location without a state or province', () => {
      const result = formatLocation({
        ...location,
        stateOrProvince: undefined,
      });
      expect(result).toBe(
        `${location.place}, ${location.city}, ${location.country}`
      );
    });

    it('should format a location with only a country', () => {
      const result = formatLocation({
        ...location,
        place: undefined,
        city: undefined,
        stateOrProvince: undefined,
      });
      expect(result).toBe(location.country);
    });
  });
});
