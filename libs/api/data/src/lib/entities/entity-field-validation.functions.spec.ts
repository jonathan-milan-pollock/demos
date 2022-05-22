import { ConflictException } from '@nestjs/common';

import faker from '@faker-js/faker';

import { Dimension, Location } from '@dark-rush-photography/shared/types';
import { DocumentModel } from '../schema/document.schema';
import {
  validateEntityCreatedDate,
  validateEntityGoogleDriveFolderId,
  validateEntityGroup,
  validateEntityLocation,
  validateEntityOrder,
  validateEntityPublishedDate,
  validateEntitySeoDescription,
  validateEntitySeoKeywords,
  validateEntitySlug,
  validateEntityText,
  validateEntityTileDimension,
  validateEntityTitle,
} from './entity-field-validation.functions';

describe('entity-field-validation.functions', () => {
  describe('validateEntityGoogleDriveFolderId', () => {
    it('should return google drive folder id from entity', () => {
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
      expect(result).toThrow('Google Drive folder id is required');
    });
  });

  describe('validateEntityGroup', () => {
    it('should return group from entity', () => {
      const group = faker.lorem.word();
      const result = validateEntityGroup({ group } as DocumentModel);
      expect(result).toBe(group);
    });

    it('should throw a conflict exception when the group is an empty string', () => {
      const result = () => {
        validateEntityGroup({
          group: '',
        } as DocumentModel);
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow('Group is required');
    });
  });

  describe('validateEntitySlug', () => {
    it('should return slug from entity', () => {
      const slug = faker.lorem.word();
      const result = validateEntitySlug({ slug } as DocumentModel);
      expect(result).toBe(slug);
    });

    it('should allow dashes in slug', () => {
      const slug = `${faker.lorem.word()}-${faker.lorem.word()}`;
      const result = validateEntitySlug({ slug } as DocumentModel);
      expect(result).toBe(slug);
    });

    it('should throw a conflict exception when the slug is an empty string', () => {
      const result = () => {
        validateEntitySlug({
          slug: '',
        } as DocumentModel);
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow('Slug is required');
    });

    it('should throw a conflict exception when the slug contains spaces', () => {
      const result = () => {
        validateEntitySlug({
          slug: `${faker.lorem.word()} ${faker.lorem.word()}`,
        } as DocumentModel);
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow('Slug cannot contain spaces');
    });

    it('should throw a conflict exception when the slug is not lowercase', () => {
      const result = () => {
        validateEntitySlug({
          slug: faker.lorem.word().toUpperCase(),
        } as DocumentModel);
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow('Slug must be lowercase');
    });

    it('should throw a conflict exception when the slug requires URI encoding', () => {
      const result = () => {
        validateEntitySlug({
          slug: `#${faker.lorem.word()}`,
        } as DocumentModel);
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow('Slug cannot require URI encoding');
    });
  });

  describe('validateEntityOrder', () => {
    it('should return order from entity', () => {
      const order = faker.datatype.number({ min: 0 });
      const result = validateEntityOrder({ order } as DocumentModel);
      expect(result).toBe(order);
    });

    it('should throw a conflict exception when the order is less than 0', () => {
      const result = () => {
        validateEntityOrder({
          order: faker.datatype.number(-1),
        } as DocumentModel);
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow('Order must be greater than or equal to 0');
    });
  });

  describe('validateEntityTitle', () => {
    it('should return title from entity', () => {
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
      expect(result).toThrow('Title is required');
    });

    it('should throw a conflict exception when the title is empty', () => {
      const result = () => {
        validateEntityTitle({
          title: '',
        } as DocumentModel);
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow('Title is required');
    });
  });

  describe('validateEntityText', () => {
    it('should return text from entity', () => {
      const text = faker.lorem.paragraphs();
      const result = validateEntityText({ text } as DocumentModel);
      expect(result).toBe(text);
    });

    it('should throw a conflict exception when the text is undefined', () => {
      const result = () => {
        validateEntityText({
          text: undefined,
        } as DocumentModel);
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow('Text is required');
    });

    it('should throw a conflict exception when the text is empty', () => {
      const result = () => {
        validateEntityText({
          text: '',
        } as DocumentModel);
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow('Text is required');
    });
  });

  describe('validateEntityCreatedDate', () => {
    it('should return created date from entity', () => {
      const createdDate = faker.date.recent().toISOString();
      const result = validateEntityCreatedDate({
        createdDate,
      } as DocumentModel);
      expect(result).toBe(createdDate);
    });

    it('should throw a conflict exception when the created date is undefined', () => {
      const result = () => {
        validateEntityCreatedDate({
          createdDate: undefined,
        } as DocumentModel);
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow('Created date is required');
    });

    it('should throw a conflict exception when the created date is empty', () => {
      const result = () => {
        validateEntityCreatedDate({
          createdDate: '',
        } as DocumentModel);
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow('Created date is required');
    });
  });

  describe('validateEntityPublishedDate', () => {
    it('should return published date from entity', () => {
      const publishedDate = faker.date.recent().toISOString();
      const result = validateEntityPublishedDate({
        publishedDate,
      } as DocumentModel);
      expect(result).toBe(publishedDate);
    });

    it('should throw a conflict exception when published date is undefined', () => {
      const result = () => {
        validateEntityPublishedDate({
          publishedDate: undefined,
        } as DocumentModel);
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow('Published date is required');
    });

    it('should throw a conflict exception when published date is empty', () => {
      const result = () => {
        validateEntityPublishedDate({
          publishedDate: '',
        } as DocumentModel);
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow('Published date is required');
    });
  });

  describe('validateEntitySeoDescription', () => {
    it('should return SEO description from entity', () => {
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
      expect(result).toThrow('SEO description is required');
    });

    it('should throw a conflict exception when the SEO description is empty', () => {
      const result = () => {
        validateEntitySeoDescription({
          seoDescription: '',
        } as DocumentModel);
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow('SEO description is required');
    });
  });

  describe('validateEntitySeoKeywords', () => {
    it('should return SEO keywords from entity', () => {
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

    it('should throw a conflict exception when SEO keywords are empty', () => {
      const result = () => {
        validateEntitySeoKeywords({
          seoKeywords: [] as string[],
        } as DocumentModel);
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow('SEO keywords are required');
    });
  });

  describe('validateEntityLocation', () => {
    it('should return location from entity', () => {
      const location: Location = {
        place: faker.company.companyName(),
        city: faker.address.city(),
        stateOrProvince: faker.address.state(),
        country: faker.address.country(),
      };
      const result = validateEntityLocation({
        location,
      } as DocumentModel);
      expect(result).toEqual(location);
    });

    it('should throw a conflict exception when the location is undefined', () => {
      const result = () => {
        validateEntityLocation({
          location: undefined,
        } as DocumentModel);
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow('Location is required');
    });
  });

  describe('validateEntityTileDimension', () => {
    it('should return tile dimension from entity', () => {
      const tileDimension: Dimension = {
        width: faker.datatype.number({ min: 1 }),
        height: faker.datatype.number({ min: 1 }),
      };

      const result = validateEntityTileDimension({
        tileDimension,
      } as DocumentModel);
      expect(result).toEqual(tileDimension);
    });

    it('should throw a conflict exception when tile dimension is undefined', () => {
      const result = () => {
        validateEntityTileDimension({
          tileDimension: undefined,
        } as DocumentModel);
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow('Tile dimension is required');
    });

    it('should throw a conflict exception when tile dimension width is less than or equal to 0', () => {
      const result = () => {
        validateEntityTileDimension({
          tileDimension: {
            width: faker.datatype.number(0),
          } as Dimension,
        } as DocumentModel);
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow('Tile dimension width must be greater than 0');
    });

    it('should throw a conflict exception when tile dimension height is less than or equal to 0', () => {
      const result = () => {
        validateEntityTileDimension({
          tileDimension: {
            height: faker.datatype.number(0),
          } as Dimension,
        } as DocumentModel);
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow('Tile dimension height must be greater than 0');
    });
  });
});
