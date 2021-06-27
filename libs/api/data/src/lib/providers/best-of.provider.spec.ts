import { BadRequestException } from '@nestjs/common';

import { BestOfType, EntityType } from '@dark-rush-photography/shared-types';

describe('best-of-type.functions', () => {
  describe('findEntityTypeFromBestOfType', () => {
    /*
    it('should return best of children document type for children best of type', () => {
      const bestOfType = BestOfType.Children;
      const entityType = EntityType.BestOfChildren;

      const result = findEntityTypeFromBestOfType(bestOfType);
      expect(result).toBe(entityType);
    });

    it('should return best of events document type for events best of type', () => {
      const bestOfType = BestOfType.Events;
      const entityType = EntityType.BestOfEvents;

      const result = findEntityTypeFromBestOfType(bestOfType);
      expect(result).toBe(entityType);
    });

    it('should return best of landscapes document type for landscapes best of type', () => {
      const bestOfType = BestOfType.Landscapes;
      const entityType = EntityType.BestOfLandscapes;

      const result = findEntityTypeFromBestOfType(bestOfType);
      expect(result).toBe(entityType);
    });

    it('should return best of nature document type for nature best of type', () => {
      const bestOfType = BestOfType.Nature;
      const entityType = EntityType.BestOfNature;

      const result = findEntityTypeFromBestOfType(bestOfType);
      expect(result).toBe(entityType);
    });

    it('should return best of real estate document type for real estate best of type', () => {
      const bestOfType = BestOfType.RealEstate;
      const entityType = EntityType.BestOfRealEstate;

      const result = findEntityTypeFromBestOfType(bestOfType);
      expect(result).toBe(entityType);
    });

    it('should throw a bad request exception if the best of type is not valid', () => {
      const bestOfType = '' as BestOfType;
      expect(() => {
        findEntityTypeFromBestOfType(bestOfType);
      }).toThrow(BadRequestException);
    });

    it('should throw message unable to find best of type when not valid', () => {
      const bestOfType = 'invalidBestOfType' as BestOfType;
      expect(() => {
        findEntityTypeFromBestOfType(bestOfType);
      }).toThrow(`Unable to find best of type invalidBestOfType`);
    });*/
  });
});
