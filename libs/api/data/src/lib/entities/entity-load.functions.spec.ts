/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as faker from 'faker';

import {
  Dimension,
  DUMMY_MONGODB_ID,
  Location,
} from '@dark-rush-photography/shared/types';
import { loadLocation, loadTileDimension } from './entity-load.functions';

describe('entity-load.functions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('loadLocation', () => {
    it('should not contain an _id value', () => {
      const location = {
        place: faker.company.companyName(),
        city: faker.address.city(),
        stateOrProvince: faker.address.state(),
        country: faker.address.country(),
      };

      const result = loadLocation({
        _id: DUMMY_MONGODB_ID,
        ...location,
      } as unknown as Location);

      expect('_id' in result!).toBe(false);
    });

    it('should return undefined if location is undefined', () => {
      const result = loadLocation(undefined);
      expect(result).toBeUndefined();
    });

    it('should load an location with all values', () => {
      const location = {
        place: faker.company.companyName(),
        city: faker.address.city(),
        stateOrProvince: faker.address.state(),
        country: faker.address.country(),
      };

      const result = loadLocation(location);

      expect(result?.place).toBe(location.place);
      expect(result?.city).toBe(location.city);
      expect(result?.stateOrProvince).toBe(location.stateOrProvince);
      expect(result?.country).toBe(location.country);
    });

    it('should load undefined values', () => {
      const result = loadLocation({
        place: undefined,
        city: undefined,
        stateOrProvince: undefined,
        country: faker.address.country(),
      } as Location);

      expect(result?.place).toBeUndefined();
      expect(result?.city).toBeUndefined();
      expect(result?.stateOrProvince).toBeUndefined();
    });
  });

  describe('loadTileDimension', () => {
    it('should not contain an _id value', () => {
      const tileDimension = {
        width: faker.datatype.number(),
        height: faker.datatype.number(),
      };

      const result = loadTileDimension({
        _id: DUMMY_MONGODB_ID,
        ...tileDimension,
      } as unknown as Dimension);

      expect('_id' in result!).toBe(false);
    });

    it('should return undefined if tile dimension is undefined', () => {
      const result = loadTileDimension(undefined);
      expect(result).toBeUndefined();
    });

    it('should load an tile dimension with all values', () => {
      const tileDimension = {
        width: faker.datatype.number(),
        height: faker.datatype.number(),
      };

      const result = loadTileDimension(tileDimension);

      expect(result?.width).toBe(tileDimension.width);
      expect(result?.height).toBe(tileDimension.height);
    });
  });
});
