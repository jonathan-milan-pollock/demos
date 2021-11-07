import * as faker from 'faker';

import {
  loadExifImageCreatedDate,
  loadExifImagePublishedDate,
  loadExifImageSeoKeywords,
} from './image-load-exif.functions';

describe('image-load-exif.functions', () => {
  describe('loadExifImageCreatedDate', () => {
    it('should use the entity created date when one is provided', () => {
      const entityCreatedDate = faker.date.recent().toISOString();
      const imageCreatedDate = undefined;
      const date = faker.date.recent();

      const result = loadExifImageCreatedDate(
        date,
        entityCreatedDate,
        imageCreatedDate
      );
      expect(result).toBe(entityCreatedDate);
    });

    it('should should use the image created date when entity created date is not provided', () => {
      const entityCreatedDate = undefined;
      const imageCreatedDate = faker.date.recent().toISOString();
      const date = faker.date.recent();

      const result = loadExifImageCreatedDate(
        date,
        entityCreatedDate,
        imageCreatedDate
      );
      expect(result).toBe(imageCreatedDate);
    });

    it('should should use iso string date when entity and image created date are not provided', () => {
      const entityCreatedDate = undefined;
      const imageCreatedDate = undefined;
      const date = faker.date.recent();

      const result = loadExifImageCreatedDate(
        date,
        entityCreatedDate,
        imageCreatedDate
      );
      expect(result).toBe(date.toISOString());
    });
  });

  describe('loadExifImagePublishedDate', () => {
    it('should should use the entity published date when one is provided', () => {
      const entityPublishedDate = faker.date.recent().toISOString();
      const date = faker.date.recent();

      const result = loadExifImagePublishedDate(date, entityPublishedDate);
      expect(result).toBe(entityPublishedDate);
    });

    it('should should use iso string date when entity and image created date are not provided', () => {
      const entityCreatedDate = undefined;
      const date = faker.date.recent();

      const result = loadExifImagePublishedDate(date, entityCreatedDate);
      expect(result).toBe(date.toISOString());
    });
  });

  describe('loadExifImageSeoKeywords', () => {
    it('should contain entity seo keywords and image seo keywords', () => {
      const additionalKeywords = ['Dark Rush Photography', 'Photography'];
      const entitySeoKeywords = ['qui', 'eius', 'voluptatum'];
      const imageSeoKeywords = ['quasi', 'pariatur'];

      const result = loadExifImageSeoKeywords(
        entitySeoKeywords,
        imageSeoKeywords.join(',')
      );
      expect(result).toEqual([
        ...additionalKeywords,
        ...entitySeoKeywords,
        ...imageSeoKeywords,
      ]);
    });

    it('should contain entity seo keywords when image seo keywords undefined', () => {
      const additionalKeywords = ['Dark Rush Photography', 'Photography'];
      const entitySeoKeywords = ['qui', 'eius', 'voluptatum'];
      const imageSeoKeywords = undefined;

      const result = loadExifImageSeoKeywords(
        entitySeoKeywords,
        imageSeoKeywords
      );
      expect(result).toEqual([...additionalKeywords, ...entitySeoKeywords]);
    });

    it('should only contain additional seo keywords when entity and image seo keywords are not provided', () => {
      const additionalKeywords = ['Dark Rush Photography', 'Photography'];
      const entitySeoKeywords = [] as string[];
      const imageSeoKeywords = undefined;

      const result = loadExifImageSeoKeywords(
        entitySeoKeywords,
        imageSeoKeywords
      );
      expect(result).toEqual(additionalKeywords);
    });

    it('should only contain unique seo keywords when entity seo keywords are duplicates', () => {
      const entitySeoKeywords = ['Dark Rush Photography', 'Photography', 'qui'];
      const imageSeoKeywords = undefined;

      const result = loadExifImageSeoKeywords(
        entitySeoKeywords,
        imageSeoKeywords
      );
      expect(result.length).toBe(3);
      expect(result).toContain('Dark Rush Photography');
      expect(result).toContain('Photography');
    });

    it('should only contain unique seo keywords when image seo keywords are duplicates', () => {
      const entitySeoKeywords = [] as string[];
      const imageSeoKeywords = ['Dark Rush Photography', 'Photography', 'qui'];

      const result = loadExifImageSeoKeywords(
        entitySeoKeywords,
        imageSeoKeywords.join(',')
      );
      expect(result.length).toBe(3);
      expect(result).toContain('Dark Rush Photography');
      expect(result).toContain('Photography');
    });

    it('should only contain unique seo keywords when entity and image seo keywords are duplicates', () => {
      const entitySeoKeywords = ['Dark Rush Photography', 'Photography', 'qui'];
      const imageSeoKeywords = ['Dark Rush Photography', 'Photography', 'eius'];

      const result = loadExifImageSeoKeywords(
        entitySeoKeywords,
        imageSeoKeywords.join(',')
      );
      expect(result.length).toBe(4);
      expect(result).toContain('Dark Rush Photography');
      expect(result).toContain('Photography');
    });
  });
});
