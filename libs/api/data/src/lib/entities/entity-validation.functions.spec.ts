import { NotFoundException } from '@nestjs/common';

import { DocumentModel } from '../schema/document.schema';
import { validateEntityFound } from './entity-validation.functions';

describe('entity-validation.functions', () => {
  describe('validateEntityFound', () => {
    it('should not throw when the document model is defined', () => {
      const result = () => validateEntityFound({} as DocumentModel);
      expect(result).not.toThrow();
    });

    it('should return the validated document model', () => {
      const result = validateEntityFound({} as DocumentModel);
      expect(result).toBeDefined();
    });

    it('should throw a not found exception when document model is null', () => {
      const result = () => {
        validateEntityFound(null);
      };
      expect(result).toThrow(NotFoundException);
    });
  });
});
