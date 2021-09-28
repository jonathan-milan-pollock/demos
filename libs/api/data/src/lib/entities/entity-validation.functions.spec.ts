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
  validateEntityIsPublished,
  validateEntityNotAlreadyExists,
  validateEntityNotPublishing,
  validateEntityType,
  validateOneEntityFound,
} from './entity-validation.functions';

describe('entity-validation.functions', () => {
  describe('validateEntityType', () => {
    it('should return entity if entity is the correct type', () => {
      const entityType = faker.random.arrayElement(Object.values(EntityType));
      const result = validateEntityType(entityType, {
        type: entityType,
      } as DocumentModel);
      expect(result).toBeDefined();
    });

    it('should throw a bad request exception when entity is not the same type', () => {
      const parameterEntityType = faker.random.arrayElement(
        Object.values(EntityType)
      );
      const documentEntityType = faker.random.arrayElement(
        Object.values(EntityType)
      );

      const result = () =>
        validateEntityType(parameterEntityType, {
          type: documentEntityType,
        } as DocumentModel);
      expect(result).toThrow(BadRequestException);
      expect(result).toThrow(
        `Entity was found as type ${documentEntityType} not ${parameterEntityType}`
      );
    });
  });

  describe('validateEntityNotAlreadyExists', () => {
    it('should not throw when entity is null', () => {
      expect(() => validateEntityNotAlreadyExists(null)).not.toThrow();
    });

    it('should throw a conflict exception when entity is provided', () => {
      const result = () => {
        validateEntityNotAlreadyExists({} as DocumentModel);
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow('Entity already exists');
    });
  });

  describe('validateEntityFound', () => {
    it('should return entity when entity is provided ', () => {
      const result = validateEntityFound({} as DocumentModel);
      expect(result).toBeDefined();
    });

    it('should throw not found exception when entity is null', () => {
      const result = () => {
        validateEntityFound(null);
      };
      expect(result).toThrow(NotFoundException);
    });
  });

  describe('validateOneEntityFound', () => {
    it('should return entity when there is one entity', () => {
      const result = validateOneEntityFound([{} as DocumentModel]);
      expect(result).toBeDefined();
    });

    it('should throw a not found exception when there are not any entities', () => {
      const result = () => {
        validateOneEntityFound([]);
      };
      expect(result).toThrow(NotFoundException);
    });

    it('should throw a conflict exception there is more than one entity found', () => {
      const result = () => {
        validateOneEntityFound([{} as DocumentModel, {} as DocumentModel]);
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow('More than one entity was found');
    });
  });

  describe('validateEntityNotPublishing', () => {
    it('should return entity when entity is not publishing', () => {
      const result = validateEntityNotPublishing({
        isPublishing: false,
      } as DocumentModel);
      expect(result).toBeDefined();
    });

    it('should throw a conflict exception when entity is being published', () => {
      const result = () => {
        validateEntityNotPublishing({
          isPublishing: true,
        } as DocumentModel);
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow(
        'Entity cannot be modified as it currently being published'
      );
    });
  });

  describe('validateEntityIsPublished', () => {
    it('should return entity when entity is published', () => {
      const result = validateEntityIsPublished({
        isPublished: true,
      } as DocumentModel);
      expect(result).toBeDefined();
    });

    it('should throw a bad request exception when entity is not published', () => {
      const result = () => {
        validateEntityIsPublished({
          isPublished: false,
        } as DocumentModel);
      };
      expect(result).toThrow(BadRequestException);
      expect(result).toThrow('Entity is not published');
    });
  });

  describe('validateEntityIsPublic', () => {
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
