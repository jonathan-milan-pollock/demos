import * as faker from 'faker';
import 'reflect-metadata';

import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';

import { EntityType, Location } from '@dark-rush-photography/shared/types';
import { DocumentModel } from '../schema/document.schema';
import {
  validateEntityDateCreatedProvided,
  validateEntityDatePublished,
  validateEntityFound,
  validateEntityGroupProvided,
  validateEntityIsPublic,
  validateEntityIsPublished,
  validateEntityLocationProvided,
  validateEntityNotAlreadyExists,
  validateEntityNotPublishing,
  validateEntitySeoDescriptionProvided,
  validateEntitySeoKeywordsProvided,
  validateEntityTitleProvided,
  validateEntityType,
  validateEntityWatchFolderId,
  validateOneEntityFound,
} from './entity-validation.functions';

describe('entity-validation.functions', () => {
  const mockDocumentModel: Partial<DocumentModel> = {
    type: faker.random.arrayElement(Object.values(EntityType)),
    group: faker.lorem.word(),
    slug: faker.lorem.word(),
    order: faker.datatype.number(),
    seoKeywords: [faker.lorem.word(), faker.lorem.word(), faker.lorem.word()],
    photoAlbumImageIsCentered: faker.datatype.boolean(),
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
      const documentModel = mockDocumentModel as DocumentModel;

      const result = validateEntityType(
        documentModel.type,
        mockDocumentModel as DocumentModel
      );
      expect(result).toBeDefined();
    });

    it('should throw a bad request exception when provided entity type is not the same', () => {
      const entityType = EntityType.About;
      const result = () => {
        validateEntityType(entityType, {
          ...mockDocumentModel,
          type: EntityType.BestOf,
        } as DocumentModel);
      };
      expect(result).toThrow(BadRequestException);
      expect(result).toThrow(
        `Found entity as ${EntityType.BestOf}, expected ${entityType}`
      );
    });
  });

  describe('validateEntityNotAlreadyExists', () => {
    it('should not throw when entity is null', () => {
      expect(() => validateEntityNotAlreadyExists(null)).not.toThrow();
    });

    it('should throw a conflict exception when entity is not null', () => {
      const result = () => {
        validateEntityNotAlreadyExists(mockDocumentModel as DocumentModel);
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow('Entity already exists');
    });
  });

  describe('validateEntityFound', () => {
    it('should return entity when entity is not null', () => {
      const documentModel = validateEntityFound(
        mockDocumentModel as DocumentModel
      );
      expect(documentModel).toBeDefined();
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
        mockDocumentModel as DocumentModel,
      ]);
      expect(result).toBeDefined();
    });

    it('should throw a conflict exception there is more than one entity found', () => {
      const result = () => {
        validateOneEntityFound([
          mockDocumentModel as DocumentModel,
          mockDocumentModel as DocumentModel,
        ]);
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow('More than one entity was found');
    });
  });

  describe('validateEntityNotPublishing', () => {
    it('should return entity when entity is not publishing', () => {
      const result = validateEntityNotPublishing({
        ...mockDocumentModel,
        isPublishing: false,
      } as DocumentModel);
      expect(result).toBeDefined();
    });

    it('should throw a conflict exception when entity is being published', () => {
      const result = () => {
        validateEntityNotPublishing({
          ...mockDocumentModel,
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
        ...mockDocumentModel,
        isPublished: true,
      } as DocumentModel);
      expect(result).toBeDefined();
    });

    it('should throw a bad request exception when entity is not published', () => {
      const result = () => {
        validateEntityIsPublished({
          ...mockDocumentModel,
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
        ...mockDocumentModel,
        isPublic: true,
      } as DocumentModel);
      expect(result).toBeDefined();
    });

    it('should throw a not found exception when entity is not public', () => {
      const result = () => {
        validateEntityIsPublic({
          ...mockDocumentModel,
          isPublic: false,
        } as DocumentModel);
      };
      expect(result).toThrow(NotFoundException);
    });
  });

  describe('validateEntityWatchFolderId', () => {
    it('should return google drive folder if entity folder can be watched', () => {
      const mockGoogleDriveFolderId = faker.datatype.string();
      const result = validateEntityWatchFolderId({
        ...mockDocumentModel,
        googleDriveFolderId: mockGoogleDriveFolderId,
      } as DocumentModel);
      expect(result).toBe(mockGoogleDriveFolderId);
    });

    it('should throw a not found exception when entity is not public', () => {
      const result = () => {
        validateEntityWatchFolderId({
          ...mockDocumentModel,
          googleDriveFolderId: undefined,
        } as DocumentModel);
      };
      expect(result).toThrow(BadRequestException);
      expect(result).toThrow('Entity cannot be watched');
    });
  });

  describe('validateEntityGroupProvided', () => {
    it('should return group if entity has a group', () => {
      const mockGroup = faker.lorem.word();
      const result = validateEntityGroupProvided(mockGroup);
      expect(result).toBe(mockGroup);
    });

    it('should throw a conflict exception when group is undefined', () => {
      const result = () => {
        validateEntityGroupProvided(undefined);
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow('A group must be provided');
    });
  });

  describe('validateEntityTitleProvided', () => {
    it('should return title if entity title is provided', () => {
      const mockTitle = faker.lorem.sentence();
      const result = validateEntityTitleProvided({
        ...mockDocumentModel,
        title: mockTitle,
      } as DocumentModel);
      expect(result).toBe(mockTitle);
    });

    it('should throw a conflict exception when title is undefined', () => {
      const result = () => {
        validateEntityTitleProvided({
          ...mockDocumentModel,
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
        ...mockDocumentModel,
        seoDescription: mockSeoDescription,
      } as DocumentModel);
      expect(result).toBe(mockSeoDescription);
    });

    it('should throw a conflict exception when SEO description is undefined', () => {
      const result = () => {
        validateEntitySeoDescriptionProvided({
          ...mockDocumentModel,
          seoDescription: undefined,
        } as DocumentModel);
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow('SEO Description was not provided');
    });
  });

  describe('validateEntitySeoKeywordsProvided', () => {
    it('should return SEO keywords if entity seo keywords are provided', () => {
      const mockSeoKeywords = [faker.lorem.word()];
      const result = validateEntitySeoKeywordsProvided({
        ...mockDocumentModel,
        seoKeywords: mockSeoKeywords,
      } as DocumentModel);
      expect(result).toBe(mockSeoKeywords);
    });

    it('should throw a conflict exception when SEO keywords are not provided', () => {
      const result = () => {
        validateEntitySeoKeywordsProvided({
          ...mockDocumentModel,
          seoKeywords: [],
        } as DocumentModel);
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow('SEO keywords were not provided');
    });
  });

  describe('validateEntityDateCreatedProvided', () => {
    it('should return date created if entity date created is provided', () => {
      const mockDateCreated = new Date().toISOString();
      const result = validateEntityDateCreatedProvided({
        ...mockDocumentModel,
        dateCreated: mockDateCreated,
      } as DocumentModel);
      expect(result).toBe(mockDateCreated);
    });

    it('should throw a conflict exception when date created is not provided', () => {
      const result = () => {
        validateEntityDateCreatedProvided({
          ...mockDocumentModel,
          dateCreated: undefined,
        } as DocumentModel);
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow('Date created was not provided');
    });
  });

  describe('validateEntityDatePublished', () => {
    it('should return date published if entity date published available', () => {
      const mockDatePublished = new Date().toISOString();
      const result = validateEntityDatePublished({
        ...mockDocumentModel,
        datePublished: mockDatePublished,
      } as DocumentModel);
      expect(result).toBe(mockDatePublished);
    });

    it('should throw a conflict exception when date published is not available', () => {
      const result = () => {
        validateEntityDatePublished({
          ...mockDocumentModel,
          datePublished: undefined,
        } as DocumentModel);
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow('Entity does not have required published date');
    });
  });

  describe('validateEntityLocationProvided', () => {
    it('should return location if entity location provided', () => {
      const mockCountry = faker.address.country();
      const mockLocation = { country: mockCountry } as Location;
      const result = validateEntityLocationProvided({
        ...mockDocumentModel,
        location: mockLocation,
      } as DocumentModel);
      expect(result.country).toBe(mockCountry);
    });

    it('should throw a conflict exception when location is not provided', () => {
      const result = () => {
        validateEntityLocationProvided({
          ...mockDocumentModel,
          location: undefined,
        } as DocumentModel);
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow('Location was not provided');
    });
  });
});
