import faker from '@faker-js/faker';

import {
  DEFAULT_ENTITY_GROUP,
  EntityType,
  WatermarkedType,
} from '@dark-rush-photography/shared/types';
import { DocumentModel } from '../schema/document.schema';
import {
  loadCreateEntityForFolder,
  loadCreateImagePostEntity,
  loadCreateTestEntity,
  loadDocumentModelsArray,
} from './entity-load-document-model.functions';

describe('entity-load-document-model.functions', () => {
  describe('loadCreateTestEntity', () => {
    it('should load values', () => {
      const result = loadCreateTestEntity();

      expect(result.type).toBe(EntityType.Test);
      expect(result.watermarkedType).toBe(WatermarkedType.WithoutWatermark);
      expect(result.group).toBe(DEFAULT_ENTITY_GROUP);
      expect(result.slug).toBeDefined();
      expect(result.order).toBe(0);
      expect(result.isPublic).toBe(false);
      expect(result.seoKeywords.length).toBe(0);
      expect(result.starredImageIsCentered).toBe(false);
      expect(result.images.length).toBe(0);
      expect(result.isDeleted).toBe(false);
    });
  });

  describe('loadCreateEntityForFolder', () => {
    it('should load values', () => {
      const entityType = faker.random.arrayElement(Object.values(EntityType));
      const googleDriveFolderId = faker.datatype.uuid();
      const watermarkedType = faker.random.arrayElement(
        Object.values(WatermarkedType)
      );
      const group = faker.lorem.word();
      const slug = faker.lorem.word();
      const order = faker.datatype.number();

      const result = loadCreateEntityForFolder(
        entityType,
        googleDriveFolderId,
        watermarkedType,
        group,
        slug,
        order
      );

      expect(result.type).toBe(entityType);
      expect(result.googleDriveFolderId).toBe(googleDriveFolderId);
      expect(result.watermarkedType).toBe(watermarkedType);
      expect(result.group).toBe(group);
      expect(result.slug).toBe(slug);
      expect(result.order).toBe(order);
      expect(result.isPublic).toBe(false);
      expect(result.seoKeywords.length).toBe(0);
      expect(result.starredImageIsCentered).toBe(false);
      expect(result.images.length).toBe(0);
      expect(result.isDeleted).toBe(false);
    });
  });

  describe('loadCreateImagePostEntity', () => {
    it('should load values', () => {
      const text = faker.lorem.paragraphs();

      const result = loadCreateImagePostEntity(text);

      expect(result.type).toBe(EntityType.ImagePost);
      expect(result.watermarkedType).toBe(WatermarkedType.WithoutWatermark);
      expect(result.group).toBe(DEFAULT_ENTITY_GROUP);
      expect(result.slug).toBeDefined();
      expect(result.order).toBe(0);
      expect(result.isPublic).toBe(false);
      expect(result.text).toEqual(text);
      expect(result.seoKeywords.length).toBe(0);
      expect(result.starredImageIsCentered).toBe(false);
      expect(result.images.length).toBe(0);
      expect(result.isDeleted).toBe(false);
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
