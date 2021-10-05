import * as faker from 'faker';

import {
  EntityType,
  EntityUpdate,
  WatermarkedType,
} from '@dark-rush-photography/shared/types';
import { DocumentModel } from '../schema/document.schema';
import {
  loadDocumentModelsArray,
  loadNewEntity,
  loadUpdateEntity,
} from './entity-load-document-model.functions';

describe('entity-load-document-model.functions', () => {
  describe('loadNewEntity', () => {
    const entityType = faker.random.arrayElement(Object.values(EntityType));
    const watermarkedType = faker.random.arrayElement(
      Object.values(WatermarkedType)
    );
    const group = faker.lorem.word();
    const slug = faker.lorem.word();

    it('should load input values', () => {
      const result = loadNewEntity(entityType, watermarkedType, group, slug);

      expect(result.type).toBe(entityType);
      expect(result.googleDriveFolderId).toBeUndefined();
      expect(result.watermarkedType).toBe(watermarkedType);
      expect(result.group).toBe(group);
      expect(result.slug).toBe(slug);
    });

    it('should load google drive folder id when provided', () => {
      const googleDriveFolderId = faker.datatype.uuid();

      const result = loadNewEntity(
        entityType,
        watermarkedType,
        group,
        slug,
        googleDriveFolderId
      );

      expect(result.googleDriveFolderId).toBe(googleDriveFolderId);
    });
  });

  describe('loadUpdateEntity', () => {
    const entityUpdate: EntityUpdate = {
      slug: faker.lorem.word(),
      order: faker.datatype.number(),
      title: faker.lorem.sentence(),
      seoDescription: faker.lorem.sentences(),
      seoKeywords: [faker.lorem.word(), faker.lorem.word(), faker.lorem.word()],
      dateCreated: faker.date.recent().toISOString(),
      datePublished: faker.date.recent().toISOString(),
      location: {
        place: faker.company.companyName(),
        street: faker.address.streetAddress(),
        city: faker.address.city(),
        stateOrProvince: faker.address.state(),
        zipCode: faker.address.zipCode(),
        country: faker.address.country(),
      },
      starredImageIsCentered: faker.datatype.boolean(),
      text: [
        faker.lorem.paragraph(),
        faker.lorem.paragraph(),
        faker.lorem.paragraph(),
      ],
      isPublic: faker.datatype.boolean(),
    };

    it('should load update values', () => {
      const result = loadUpdateEntity(entityUpdate);

      expect(result.slug).toBe(entityUpdate.slug);
      expect(result.order).toBe(entityUpdate.order);
      expect(result.title).toBe(entityUpdate.title);
      expect(result.seoDescription).toBe(entityUpdate.seoDescription);
      expect(result.seoKeywords).toBe(entityUpdate.seoKeywords);
      expect(result.dateCreated).toBe(entityUpdate.dateCreated);
      expect(result.datePublished).toBe(entityUpdate.datePublished);
      expect(result.location).toBe(entityUpdate.location);
      expect(result.starredImageIsCentered).toBe(
        entityUpdate.starredImageIsCentered
      );
      expect(result.text).toBe(entityUpdate.text);
      expect(result.isPublic).toBe(entityUpdate.isPublic);
    });
  });

  describe('loadDocumentModelsArray', () => {
    it('should load array when document model array is provided', () => {
      const result = loadDocumentModelsArray([
        {} as DocumentModel,
        {} as DocumentModel,
      ]);
      expect(result).toHaveLength(2);
    });

    it('should load array when document model provided', () => {
      const result = loadDocumentModelsArray({} as DocumentModel);
      expect(result).toHaveLength(1);
    });
  });
});
