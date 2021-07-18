import 'reflect-metadata';

import { BestOfType, EntityType } from '@dark-rush-photography/shared/types';
import { getBestOfTypeFromEntityType } from './entity-to-best-of-type.functions';

describe('entity-to-best-of-type.functions', () => {
  describe('getBestOfTypeFromEntityType', () => {
    it('should return best of children', () => {
      const result = getBestOfTypeFromEntityType(EntityType.BestOfChildren);
      expect(result).toBe(BestOfType.Children);
    });

    it('should return best of events', () => {
      const result = getBestOfTypeFromEntityType(EntityType.BestOfEvents);
      expect(result).toBe(BestOfType.Events);
    });

    it('should return best of landscapes', () => {
      const result = getBestOfTypeFromEntityType(EntityType.BestOfLandscapes);
      expect(result).toBe(BestOfType.Landscapes);
    });

    it('should return best of nature', () => {
      const result = getBestOfTypeFromEntityType(EntityType.BestOfNature);
      expect(result).toBe(BestOfType.Nature);
    });

    it('should return best of real estate', () => {
      const result = getBestOfTypeFromEntityType(EntityType.BestOfRealEstate);
      expect(result).toBe(BestOfType.RealEstate);
    });

    it('should throw a range error if entity type is not a best of type', () => {
      const entityType = '' as EntityType;
      expect(() => {
        getBestOfTypeFromEntityType(entityType);
      }).toThrow(RangeError);
    });

    it('should throw correct error message', () => {
      const entityType = 'invalidEntityType' as EntityType;
      expect(() => {
        getBestOfTypeFromEntityType(entityType);
      }).toThrow(`Unable to get best of type from entity type ${entityType}`);
    });
  });
});
