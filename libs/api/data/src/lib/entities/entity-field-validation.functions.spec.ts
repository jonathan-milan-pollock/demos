import { ConflictException } from '@nestjs/common';

import * as faker from 'faker';

import { DocumentModel } from '../schema/document.schema';
import {
  validateEntityDateCreated,
  validateEntityDatePublished,
  validateEntityGoogleDriveFolderId,
  validateEntitySeoDescription,
  validateEntitySeoKeywords,
  validateEntityTitle,
} from './entity-field-validation.functions';

describe('entity-validation.functions', () => {
  describe('validateEntityGoogleDriveFolderId', () => {
    it('should return the google drive folder id from the document', () => {
      const googleDriveFolderId = faker.datatype.uuid();
      const result = validateEntityGoogleDriveFolderId({
        googleDriveFolderId,
      } as DocumentModel);
      expect(result).toBe(googleDriveFolderId);
    });

    it('should throw a conflict exception when the google drive folder id is undefined', () => {
      const result = () =>
        validateEntityGoogleDriveFolderId({
          googleDriveFolderId: undefined,
        } as DocumentModel);
      expect(result).toThrow(ConflictException);
      expect(result).toThrow('Google Drive folder id is undefined');
    });
  });

  describe('validateEntityTitle', () => {
    it('should return the title from the document', () => {
      const title = faker.lorem.sentence();
      const result = validateEntityTitle({ title } as DocumentModel);
      expect(result).toBe(title);
    });

    it('should throw a conflict exception when the title is undefined', () => {
      const result = () => {
        validateEntityTitle({
          title: undefined,
        } as DocumentModel);
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow('Title is undefined');
    });
  });

  describe('validateEntitySeoDescription', () => {
    it('should return the SEO description from the document', () => {
      const seoDescription = faker.lorem.sentences();
      const result = validateEntitySeoDescription({
        seoDescription,
      } as DocumentModel);
      expect(result).toBe(seoDescription);
    });

    it('should throw a conflict exception when the SEO description is undefined', () => {
      const result = () => {
        validateEntitySeoDescription({
          seoDescription: undefined,
        } as DocumentModel);
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow('SEO description is undefined');
    });
  });

  describe('validateEntitySeoKeywords', () => {
    it('should return SEO keywords from the document', () => {
      const seoKeywords = [
        faker.lorem.word(),
        faker.lorem.word(),
        faker.lorem.word(),
      ];
      const result = validateEntitySeoKeywords({
        seoKeywords,
      } as DocumentModel);
      expect(result).toEqual(seoKeywords);
    });

    it('should throw a conflict exception when the SEO keywords are empty', () => {
      const emptySeoKeywords: string[] = [];
      const result = () => {
        validateEntitySeoKeywords({
          seoKeywords: emptySeoKeywords,
        } as DocumentModel);
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow('SEO keywords are empty');
    });
  });

  describe('validateEntityDateCreated', () => {
    it('should return the date created from the document', () => {
      const dateCreated = new Date().toISOString();
      const result = validateEntityDateCreated({
        dateCreated,
      } as DocumentModel);
      expect(result).toBe(dateCreated);
    });

    it('should throw a conflict exception when the date created is undefined', () => {
      const result = () => {
        validateEntityDateCreated({
          dateCreated: undefined,
        } as DocumentModel);
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow('Date created is undefined');
    });
  });

  describe('validateEntityDatePublished', () => {
    it('should return the date published from the document', () => {
      const datePublished = new Date().toISOString();
      const result = validateEntityDatePublished({
        datePublished,
      } as DocumentModel);
      expect(result).toBe(datePublished);
    });

    it('should throw a conflict exception when date published is undefined', () => {
      const result = () => {
        validateEntityDatePublished({
          datePublished: undefined,
        } as DocumentModel);
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow('Date published is undefined');
    });
  });
});
