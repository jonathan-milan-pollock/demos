import { ConflictException } from '@nestjs/common';

import * as faker from 'faker';

import { EntityType } from '@dark-rush-photography/shared/types';
import { DocumentModel } from '../schema/document.schema';
import {
  validateEntityDateCreatedProvided,
  validateEntityDatePublished,
  validateEntitySeoDescriptionProvided,
  validateEntitySeoKeywordsProvided,
  validateEntityTitleProvided,
} from './entity-field-validation.functions';

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

  describe('validateEntityTitleProvided', () => {
    it('should return title if entity title is provided', () => {
      const mockTitle = faker.lorem.sentence();
      const result = validateEntityTitleProvided({
        ...partialDocumentModel,
        title: mockTitle,
      } as DocumentModel);
      expect(result).toBe(mockTitle);
    });

    it('should throw a conflict exception when title is undefined', () => {
      const result = () => {
        validateEntityTitleProvided({
          ...partialDocumentModel,
          title: undefined,
        } as DocumentModel);
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow('Title was not provided');
    });
  });

  describe('validateEntitySeoDescriptionProvided', () => {
    it('should return SEO description if entity seo description is provided', () => {
      const mockSeoDescription = faker.lorem.sentences();
      const result = validateEntitySeoDescriptionProvided({
        ...partialDocumentModel,
        seoDescription: mockSeoDescription,
      } as DocumentModel);
      expect(result).toBe(mockSeoDescription);
    });

    it('should throw a conflict exception when SEO description is undefined', () => {
      const result = () => {
        validateEntitySeoDescriptionProvided({
          ...partialDocumentModel,
          seoDescription: undefined,
        } as DocumentModel);
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow('SEO description was not provided');
    });
  });

  describe('validateEntitySeoKeywordsProvided', () => {
    it('should return SEO keywords if entity seo keywords are provided', () => {
      const mockSeoKeywords = [faker.lorem.word()];
      const result = validateEntitySeoKeywordsProvided({
        ...partialDocumentModel,
        seoKeywords: mockSeoKeywords,
      } as DocumentModel);
      expect(result).toBe(mockSeoKeywords);
    });

    it('should throw a conflict exception when SEO keywords are not provided', () => {
      const result = () => {
        validateEntitySeoKeywordsProvided({
          ...partialDocumentModel,
          seoKeywords: [],
        } as DocumentModel);
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow('SEO keywords were not provided');
    });
  });

  describe('validateEntityDateCreatedProvided', () => {
    it('should return date created if entity date created is provided', () => {
      const dateCreated = new Date().toISOString();
      const result = validateEntityDateCreatedProvided({
        ...partialDocumentModel,
        dateCreated: dateCreated,
      } as DocumentModel);
      expect(result).toBe(dateCreated);
    });

    it('should throw a conflict exception when date created is not provided', () => {
      const result = () => {
        validateEntityDateCreatedProvided({
          ...partialDocumentModel,
          dateCreated: undefined,
        } as DocumentModel);
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow('Date created was not provided');
    });
  });

  describe('validateEntityDatePublished', () => {
    it('should return date published if entity date published available', () => {
      const datePublished = new Date().toISOString();
      const result = validateEntityDatePublished({
        ...partialDocumentModel,
        datePublished: datePublished,
      } as DocumentModel);
      expect(result).toBe(datePublished);
    });

    it('should throw a conflict exception when date published is not available', () => {
      const result = () => {
        validateEntityDatePublished({
          ...partialDocumentModel,
          datePublished: undefined,
        } as DocumentModel);
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow('Entity does not have required published date');
    });
  });
});
