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
  const partialDocumentModel: Partial<DocumentModel> = {
    type: faker.random.arrayElement(Object.values(EntityType)),
    group: faker.lorem.word(),
    slug: faker.lorem.word(),
    order: faker.datatype.number(),
    seoKeywords: [faker.lorem.word(), faker.lorem.word(), faker.lorem.word()],
    starredImageIsCentered: faker.datatype.boolean(),
    text: [
      faker.lorem.sentence(),
      faker.lorem.sentence(),
      faker.lorem.sentence(),
    ],
    images: [],
    imageDimensions: [],
    videos: [],
    comments: [],
    emotions: [],
    isPublic: faker.datatype.boolean(),
    isPublishing: faker.datatype.boolean(),
    isPublished: faker.datatype.boolean(),
  };

  describe('validateEntityType', () => {
    it('should return entity if entity type is the same as the entity', () => {
      const documentModel = partialDocumentModel as DocumentModel;

      const result = validateEntityType(
        documentModel.type,
        documentModel as DocumentModel
      );
      expect(result).toBeDefined();
    });

    it('should throw a bad request exception when provided entity type is not the same', () => {
      const entityType = EntityType.About;
      const result = () => {
        validateEntityType(entityType, {
          ...partialDocumentModel,
          type: EntityType.BestOf,
        } as DocumentModel);
      };
      expect(result).toThrow(BadRequestException);
      expect(result).toThrow(
        `Entity was found as type ${EntityType.BestOf} not ${entityType}`
      );
    });
  });

  describe('validateEntityNotAlreadyExists', () => {
    it('should not throw when entity is null', () => {
      expect(() => validateEntityNotAlreadyExists(null)).not.toThrow();
    });

    it('should throw a conflict exception when entity is not null', () => {
      const result = () => {
        validateEntityNotAlreadyExists(partialDocumentModel as DocumentModel);
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow('Entity already exists');
    });
  });

  describe('validateEntityFound', () => {
    it('should return entity when entity is not null', () => {
      const result = validateEntityFound(partialDocumentModel as DocumentModel);
      expect(result).toBeDefined();
    });

    it('should throw not found exception when entity is null', () => {
      const result = () => {
        validateEntityFound(null);
      };
      expect(result).toThrow(NotFoundException);
      expect(result).toThrow('Entity was not found');
    });
  });

  describe('validateOneEntityFound', () => {
    it('should return entity when there is only one entity', () => {
      const result = validateOneEntityFound([
        partialDocumentModel as DocumentModel,
      ]);
      expect(result).toBeDefined();
    });

    it('should throw a conflict exception there is more than one entity found', () => {
      const result = () => {
        validateOneEntityFound([
          partialDocumentModel as DocumentModel,
          partialDocumentModel as DocumentModel,
        ]);
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow('More than one entity was found');
    });
  });

  describe('validateEntityNotPublishing', () => {
    it('should return entity when entity is not publishing', () => {
      const result = validateEntityNotPublishing({
        ...partialDocumentModel,
        isPublishing: false,
      } as DocumentModel);
      expect(result).toBeDefined();
    });

    it('should throw a conflict exception when entity is being published', () => {
      const result = () => {
        validateEntityNotPublishing({
          ...partialDocumentModel,
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
        ...partialDocumentModel,
        isPublished: true,
      } as DocumentModel);
      expect(result).toBeDefined();
    });

    it('should throw a bad request exception when entity is not published', () => {
      const result = () => {
        validateEntityIsPublished({
          ...partialDocumentModel,
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
        ...partialDocumentModel,
        isPublic: true,
      } as DocumentModel);
      expect(result).toBeDefined();
    });

    it('should throw a not found exception when entity is not public', () => {
      const result = () => {
        validateEntityIsPublic({
          ...partialDocumentModel,
          isPublic: false,
        } as DocumentModel);
      };
      expect(result).toThrow(NotFoundException);
    });
  });
});
