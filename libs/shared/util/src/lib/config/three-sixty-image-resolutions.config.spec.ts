import 'reflect-metadata';

import { BestOfType, EntityType } from '@dark-rush-photography/shared/types';
import { getEntityTypeFromBestOfType } from './best-of-to-entity-type.functions';

describe('best-of-to-entity-type.functions', () => {
  describe('getEntityTypeFromBestOfType', () => {
    it('should return best of children', () => {
      const result = getEntityTypeFromBestOfType(BestOfType.Children);
      expect(result).toBe(EntityType.BestOfChildren);
    });

    it('should return best of events', () => {
      const result = getEntityTypeFromBestOfType(BestOfType.Events);
      expect(result).toBe(EntityType.BestOfEvents);
    });

    it('should return best of landscapes', () => {
      const result = getEntityTypeFromBestOfType(BestOfType.Landscapes);
      expect(result).toBe(EntityType.BestOfLandscapes);
    });

    it('should return best of nature', () => {
      const result = getEntityTypeFromBestOfType(BestOfType.Nature);
      expect(result).toBe(EntityType.BestOfNature);
    });

    it('should return best of real estate', () => {
      const result = getEntityTypeFromBestOfType(BestOfType.RealEstate);
      expect(result).toBe(EntityType.BestOfRealEstate);
    });

    it('should throw a range error if best of type is not an entity type', () => {
      const bestOfType = '' as BestOfType;
      expect(() => {
        getEntityTypeFromBestOfType(bestOfType);
      }).toThrow(RangeError);
    });

    it('should throw correct error message', () => {
      const bestOfType = 'invalidBestOfType' as BestOfType;
      expect(() => {
        getEntityTypeFromBestOfType(bestOfType);
      }).toThrow(`Unable to get entity type from best of type ${bestOfType}`);
    });
  });
});
