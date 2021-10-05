import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';

import * as faker from 'faker';

import { EntityType } from '@dark-rush-photography/shared/types';
import { DocumentModel } from '../schema/document.schema';
import {
  validateEntityFound,
  validateEntityIsPublic,
  validateEntityNotAlreadyExists,
  validateEntityType,
} from './entity-validation.functions';

describe('entity-validation.functions', () => {
  describe('validateEntityType', () => {
    it('should not throw exception when entity type provided is the same as on the document model', () => {
      const entityType = faker.random.arrayElement(Object.values(EntityType));
      const result = () =>
        validateEntityType(entityType, { type: entityType } as DocumentModel);
      expect(result).not.toThrow();
    });

    it('should return the document model that was provided', () => {
      const entityType = faker.random.arrayElement(Object.values(EntityType));
      const result = validateEntityType(entityType, {
        type: entityType,
      } as DocumentModel);
      expect(result.type).toBe(entityType);
    });

    it('should throw a bad request exception when the entity type provided is not the same as on the document model', () => {
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

  describe('validateEntityNotAlreadyExists', () => {
    it('should not throw when document model is null', () => {
      expect(() => validateEntityNotAlreadyExists(null)).not.toThrow();
    });

    it('should throw a conflict exception when document model is provided', () => {
      const result = () => {
        validateEntityNotAlreadyExists({} as DocumentModel);
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow('Entity already exists');
    });
  });

  describe('validateEntityFound', () => {
    it('should not throw exception when document model is provided', () => {
      const result = () => validateEntityFound({} as DocumentModel);
      expect(result).not.toThrow();
    });

    it('should return the document model that was provided', () => {
      const result = validateEntityFound({} as DocumentModel);
      expect(result).toBeDefined();
    });

    it('should throw not found exception when document model is null', () => {
      const result = () => {
        validateEntityFound(null);
      };
      expect(result).toThrow(NotFoundException);
    });
  });

  describe('validateEntityIsPublic', () => {
    it('should not throw exception when document model is public', () => {
      const result = () =>
        validateEntityIsPublic({ isPublic: true } as DocumentModel);
      expect(result).not.toThrow();
    });

    it('should return entity when entity is public', () => {
      const result = validateEntityIsPublic({
        isPublic: true,
      } as DocumentModel);
      expect(result).toBeDefined();
    });

    it('should throw a not found exception when entity is not public', () => {
      const result = () => {
        validateEntityIsPublic({
          isPublic: false,
        } as DocumentModel);
      };
      expect(result).toThrow(NotFoundException);
    });
  });
});
