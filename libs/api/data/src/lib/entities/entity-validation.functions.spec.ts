import { NotFoundException } from '@nestjs/common';

import { DocumentModel } from '../schema/document.schema';
import {
  validateEntityFound,
  validateEntityIsPublic,
} from './entity-validation.functions';

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

  describe('validateEntityIsPublic', () => {
    it('should not throw when the document model is public', () => {
      const result = () =>
        validateEntityIsPublic({ isPublic: true } as DocumentModel);
      expect(result).not.toThrow();
    });

    it('should return the validated document model', () => {
      const result = validateEntityIsPublic({
        isPublic: true,
      } as DocumentModel);
      expect(result).toBeDefined();
    });

    it('should throw a not found exception when document model is not public', () => {
      const result = () => {
        validateEntityIsPublic({
          isPublic: false,
        } as DocumentModel);
      };
      expect(result).toThrow(NotFoundException);
    });
  });
});
