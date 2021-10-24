import { BadRequestException, NotFoundException } from '@nestjs/common';

import * as faker from 'faker';

import { EntityType } from '@dark-rush-photography/shared/types';
import { DocumentModel } from '../schema/document.schema';
import {
  validateEntityFound,
  validateEntityIsPublic,
  validateEntityType,
} from './entity-validate-document-model.functions';

describe('entity-validate-document-model.functions', () => {
  describe('validateEntityType', () => {
    it('should not throw when the entity type is the same as on the document model', () => {
      const entityType = faker.random.arrayElement(Object.values(EntityType));
      const result = () =>
        validateEntityType(entityType, { type: entityType } as DocumentModel);
      expect(result).not.toThrow();
    });

    it('should return the validated document model', () => {
      const entityType = faker.random.arrayElement(Object.values(EntityType));
      const result = validateEntityType(entityType, {
        type: entityType,
      } as DocumentModel);
      expect(result.type).toBe(entityType);
    });

    it('should throw a bad request exception when the entity type is not the same as on the document model', () => {
      const providedEntityType = EntityType.About;
      const documentEntityType = EntityType.BestOf;
      const result = () => {
        validateEntityType(providedEntityType, {
          type: documentEntityType,
        } as DocumentModel);
      };
      expect(result).toThrow(BadRequestException);
      expect(result).toThrow(
        `Found entity as ${documentEntityType} was called with ${providedEntityType}`
      );
    });
  });

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
