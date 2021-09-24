import * as faker from 'faker';
import 'reflect-metadata';

import {
  DUMMY_MONGODB_ID,
  EntityCreate,
  EntityType,
  Location,
  WatermarkedType,
} from '@dark-rush-photography/shared/types';
import { DocumentModel } from '../schema/document.schema';
import { loadEntity, loadNewEntity } from './entity.functions';

describe('entity.functions', () => {
  const mockEntityCreate: EntityCreate = {
    watermarkedType: faker.random.arrayElement(Object.values(WatermarkedType)),
    group: faker.lorem.word(),
    slug: faker.lorem.word(),
    isPublic: faker.datatype.boolean(),
  };

  describe('loadNewEntity', () => {
    it('should return an entity with the type specified', () => {
      const mockEntityType = faker.random.arrayElement(
        Object.values(EntityType)
      );

      const result = loadNewEntity(mockEntityType, mockEntityCreate);
      expect(result.type).toBe(mockEntityType);
    });

    it('should return an entity with values specified in entity create', () => {
      const entityType = faker.random.arrayElement(Object.values(EntityType));
      const watermarkedType = faker.random.arrayElement(
        Object.values(WatermarkedType)
      );

      const group = faker.lorem.word();
      const slug = faker.lorem.word();
      const isPublic = faker.datatype.boolean();

      const result = loadNewEntity(entityType, {
        watermarkedType,
        group,
        slug,
        isPublic,
      });

      expect(result.group).toBe(group);
      expect(result.slug).toBe(slug);
      expect(result.isPublic).toBe(isPublic);
    });

    it('should return a google drive folder id if provided', () => {
      const mockEntityType = faker.random.arrayElement(
        Object.values(EntityType)
      );

      const mockGoogleDriveFolderId = faker.datatype.string();
      const result = loadNewEntity(
        mockEntityType,
        mockEntityCreate,
        mockGoogleDriveFolderId
      );

      expect(result.googleDriveFolderId).toBe(mockGoogleDriveFolderId);
    });
  });

  describe('loadEntity', () => {
    it('should return an entity with values specified in entity create', () => {
      const type = faker.random.arrayElement(Object.values(EntityType));
      const googleDriveFolderId = faker.datatype.string();
      const group = faker.lorem.word();
      const slug = faker.lorem.word();
      const order = faker.datatype.number();
      const title = faker.lorem.sentence();
      const seoDescription = faker.lorem.sentences();
      const seoKeywords = [
        faker.lorem.word(),
        faker.lorem.word(),
        faker.lorem.word(),
      ];
      const dateCreated = new Date().toISOString();
      const datePublished = new Date().toISOString();
      const location: Location = { country: faker.address.country() };
      const photoAlbumImageIsCentered = faker.datatype.boolean();
      const text = [
        faker.lorem.sentence(),
        faker.lorem.sentence(),
        faker.lorem.sentence(),
      ];
      //TODO: Add images, videos, comments, and emotions
      const isPublic = faker.datatype.boolean();
      const isPublishing = faker.datatype.boolean();
      const isPublished = faker.datatype.boolean();

      const mockDocumentModel: Partial<DocumentModel> = {
        _id: DUMMY_MONGODB_ID,
        type,
        googleDriveFolderId,
        group,
        slug,
        order,
        title,
        seoDescription,
        seoKeywords,
        dateCreated,
        datePublished,
        location,
        photoAlbumImageIsCentered,
        text,
        images: [],
        imageDimensions: [],
        videos: [],
        comments: [],
        emotions: [],
        isPublic,
        isPublishing,
        isPublished,
      };

      const result = loadEntity(mockDocumentModel as DocumentModel);

      expect(result.type).toBe(type);
      expect(result.id).toBe(DUMMY_MONGODB_ID);
      expect(result.googleDriveFolderId).toBe(googleDriveFolderId);
      expect(result.group).toBe(group);
      expect(result.slug).toBe(slug);
      expect(result.order).toBe(order);
      expect(result.title).toBe(title);
      expect(result.seoDescription).toBe(seoDescription);
      expect(result.seoKeywords).toEqual(seoKeywords);
      expect(result.dateCreated).toBe(dateCreated);
      expect(result.datePublished).toBe(datePublished);
      expect(result.location).toEqual(location);
      expect(result.photoAlbumImageIsCentered).toBe(photoAlbumImageIsCentered);
      expect(result.text).toEqual(text);
      expect(result.isPublic).toEqual(isPublic);
      expect(result.isPublishing).toEqual(isPublishing);
      expect(result.isPublished).toEqual(isPublished);
    });
  });
});
