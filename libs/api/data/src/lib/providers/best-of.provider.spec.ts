import { BadRequestException } from '@nestjs/common';

import { BestOfType, DocumentType } from '@dark-rush-photography/shared-types';

describe('best-of-type.functions', () => {
  describe('findDocumentTypeFromBestOfType', () => {
    /*
    it('should return best of children document type for children best of type', () => {
      const bestOfType = BestOfType.Children;
      const documentType = DocumentType.BestOfChildren;

      const result = findDocumentTypeFromBestOfType(bestOfType);
      expect(result).toBe(documentType);
    });

    it('should return best of events document type for events best of type', () => {
      const bestOfType = BestOfType.Events;
      const documentType = DocumentType.BestOfEvents;

      const result = findDocumentTypeFromBestOfType(bestOfType);
      expect(result).toBe(documentType);
    });

    it('should return best of landscapes document type for landscapes best of type', () => {
      const bestOfType = BestOfType.Landscapes;
      const documentType = DocumentType.BestOfLandscapes;

      const result = findDocumentTypeFromBestOfType(bestOfType);
      expect(result).toBe(documentType);
    });

    it('should return best of nature document type for nature best of type', () => {
      const bestOfType = BestOfType.Nature;
      const documentType = DocumentType.BestOfNature;

      const result = findDocumentTypeFromBestOfType(bestOfType);
      expect(result).toBe(documentType);
    });

    it('should return best of real estate document type for real estate best of type', () => {
      const bestOfType = BestOfType.RealEstate;
      const documentType = DocumentType.BestOfRealEstate;

      const result = findDocumentTypeFromBestOfType(bestOfType);
      expect(result).toBe(documentType);
    });

    it('should throw a bad request exception if the best of type is not valid', () => {
      const bestOfType = '' as BestOfType;
      expect(() => {
        findDocumentTypeFromBestOfType(bestOfType);
      }).toThrow(BadRequestException);
    });

    it('should throw message unable to find best of type when not valid', () => {
      const bestOfType = 'invalidBestOfType' as BestOfType;
      expect(() => {
        findDocumentTypeFromBestOfType(bestOfType);
      }).toThrow(`Unable to find best of type invalidBestOfType`);
    });*/
  });
});
