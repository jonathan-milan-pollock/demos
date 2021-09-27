import * as faker from 'faker';

import {
  Comment,
  DUMMY_MONGODB_ID,
  Emotion,
  EmotionType,
  EntityType,
  Image,
  ImageDimension,
  ImageDimensionType,
  ImageState,
  Location,
  User,
  Video,
  WatermarkedType,
} from '@dark-rush-photography/shared/types';
import { DocumentModel } from '../schema/document.schema';
import {
  loadDocumentModelsArray,
  loadEntity,
  loadEntityMinimal,
  loadNewEntity,
} from './entity.functions';

describe('entity.functions', () => {
  const image: Image = {
    id: faker.datatype.uuid(),
    entityId: DUMMY_MONGODB_ID,
    blobPathId: faker.datatype.uuid(),
    fileName: faker.system.fileName(),
    state: faker.random.arrayElement(Object.values(ImageState)),
    order: faker.datatype.number(),
    isStarred: faker.datatype.boolean(),
    isLoved: faker.datatype.boolean(),
    title: faker.lorem.sentence(),
    seoDescription: faker.lorem.paragraph(),
    seoKeywords: [
      faker.lorem.word().toLowerCase(),
      faker.lorem.word().toLowerCase(),
      faker.lorem.word().toLowerCase(),
    ].join(','),
    dateCreated: faker.date.recent().toISOString(),
    datePublished: faker.date.recent().toISOString(),
    isThreeSixty: faker.datatype.boolean(),
  };

  const imageDimension: ImageDimension = {
    id: faker.datatype.uuid(),
    entityId: DUMMY_MONGODB_ID,
    imageId: faker.datatype.uuid(),
    type: faker.random.arrayElement(Object.values(ImageDimensionType)),
    resolution: {
      width: faker.datatype.number(),
      height: faker.datatype.number(),
    },
    threeSixtySettings: {
      pitch: faker.datatype.number(),
      yaw: faker.datatype.number(),
      roll: faker.datatype.number(),
      hfov: faker.datatype.number(),
    },
  };

  const video: Video = {
    id: faker.datatype.uuid(),
    entityId: DUMMY_MONGODB_ID,
    blobPathId: faker.datatype.uuid(),
    fileName: faker.system.fileName(),
  };

  const user: User = {
    email: faker.internet.email(),
    name: faker.name.findName(faker.name.firstName(), faker.name.lastName()),
    imageUrl: faker.image.dataUri(),
  };

  const comment: Comment = {
    id: faker.datatype.uuid(),
    entityId: DUMMY_MONGODB_ID,
    mediaId: faker.datatype.uuid(),
    order: faker.datatype.number(),
    user: {
      ...user,
    },
    text: faker.lorem.sentence(),
  };

  const emotion: Emotion = {
    id: faker.datatype.uuid(),
    entityId: DUMMY_MONGODB_ID,
    mediaId: faker.datatype.uuid(),
    commentId: faker.datatype.uuid(),
    type: faker.random.arrayElement(Object.values(EmotionType)),
    user: {
      ...user,
    },
  };

  const ID = DUMMY_MONGODB_ID;
  const ENTITY_TYPE = faker.random.arrayElement(Object.values(EntityType));
  const GOOGLE_DRIVE_FOLDER_ID = faker.datatype.uuid();
  const WATERMARKED_TYPE = faker.random.arrayElement(
    Object.values(WatermarkedType)
  );
  const GROUP = faker.date.soon().getFullYear().toString();
  const SLUG = faker.lorem.word().toLowerCase();
  const ORDER = faker.datatype.number();
  const TITLE = faker.lorem.sentence();
  const SEO_DESCRIPTION = faker.lorem.sentences();
  const SEO_KEYWORDS = [
    faker.lorem.word().toLowerCase(),
    faker.lorem.word().toLowerCase(),
    faker.lorem.word().toLowerCase(),
  ];
  const DATE_CREATED = faker.date.recent().toISOString();
  const DATE_PUBLISHED = faker.date.recent().toISOString();
  const LOCATION: Location = {
    place: faker.company.companyName(),
    street: faker.address.streetAddress(),
    stateOrProvince: faker.address.state(),
    zipCode: faker.address.zipCode(),
    country: faker.address.country(),
  };
  const STARRED_IMAGE_IS_CENTERED = faker.datatype.boolean();
  const TEXT = [
    faker.lorem.paragraph(),
    faker.lorem.paragraph(),
    faker.lorem.paragraph(),
  ];
  const IMAGES = [{ ...image }, { ...image }];
  const IMAGE_DIMENSIONS = [
    { ...imageDimension },
    { ...imageDimension },
    { ...imageDimension },
    { ...imageDimension },
  ];
  const VIDEOS = [{ ...video }];
  const COMMENTS = [{ ...comment }, { ...comment }, { ...comment }];
  const EMOTIONS = [
    { ...emotion },
    { ...emotion },
    { ...emotion },
    { ...emotion },
  ];
  const IS_PUBLIC = faker.datatype.boolean();
  const IS_PUBLISHING = faker.datatype.boolean();
  const IS_PUBLISHED = faker.datatype.boolean();

  describe('loadNewEntity', () => {
    it('should load input values', () => {
      const result = loadNewEntity(ENTITY_TYPE, WATERMARKED_TYPE, GROUP, SLUG);

      expect(result.type).toBe(ENTITY_TYPE);
      expect(result.watermarkedType).toBe(WATERMARKED_TYPE);
      expect(result.group).toBe(GROUP);
      expect(result.slug).toBe(SLUG);
    });
  });

  describe('loadEntity', () => {
    it('should load an entity with all values', () => {
      const result = loadEntity({
        type: ENTITY_TYPE,
        _id: ID,
        googleDriveFolderId: GOOGLE_DRIVE_FOLDER_ID,
        watermarkedType: WATERMARKED_TYPE,
        group: GROUP,
        slug: SLUG,
        order: ORDER,
        title: TITLE,
        seoDescription: SEO_DESCRIPTION,
        seoKeywords: SEO_KEYWORDS,
        dateCreated: DATE_CREATED,
        datePublished: DATE_PUBLISHED,
        location: LOCATION,
        starredImageIsCentered: STARRED_IMAGE_IS_CENTERED,
        text: TEXT,
        images: IMAGES,
        imageDimensions: IMAGE_DIMENSIONS,
        videos: VIDEOS,
        comments: COMMENTS,
        emotions: EMOTIONS,
        isPublic: IS_PUBLIC,
        isPublishing: IS_PUBLISHING,
        isPublished: IS_PUBLISHED,
      } as unknown as DocumentModel);

      expect(result.type).toBe(ENTITY_TYPE);
      expect(result.id).toBe(ID);
      expect(result.googleDriveFolderId).toBe(GOOGLE_DRIVE_FOLDER_ID);
      expect(result.watermarkedType).toBe(WATERMARKED_TYPE);
      expect(result.group).toBe(GROUP);
      expect(result.slug).toBe(SLUG);
      expect(result.order).toBe(ORDER);
      expect(result.title).toBe(TITLE);
      expect(result.seoDescription).toBe(SEO_DESCRIPTION);
      expect(result.seoKeywords).toEqual(SEO_KEYWORDS);
      expect(result.dateCreated).toBe(DATE_CREATED);
      expect(result.datePublished).toBe(DATE_PUBLISHED);
      expect(result.location).toEqual(LOCATION);
      expect(result.starredImageIsCentered).toBe(STARRED_IMAGE_IS_CENTERED);
      expect(result.text).toEqual(TEXT);
      expect(result.images).toEqual(IMAGES);
      expect(result.imageDimensions).toEqual(IMAGE_DIMENSIONS);
      expect(result.videos).toEqual(VIDEOS);
      expect(result.comments).toEqual(COMMENTS);
      expect(result.emotions).toEqual(EMOTIONS);
      expect(result.isPublic).toBe(IS_PUBLIC);
      expect(result.isPublishing).toBe(IS_PUBLISHING);
      expect(result.isPublished).toBe(IS_PUBLISHED);
    });
  });

  describe('loadEntityMinimal', () => {
    it('should load an entity with minimal values', () => {
      const result = loadEntityMinimal({
        type: ENTITY_TYPE,
        _id: ID,
        watermarkedType: WATERMARKED_TYPE,
        group: GROUP,
        slug: SLUG,
      } as unknown as DocumentModel);

      expect(result.type).toBe(ENTITY_TYPE);
      expect(result.id).toBe(ID);
      expect(result.watermarkedType).toBe(WATERMARKED_TYPE);
      expect(result.group).toBe(GROUP);
      expect(result.slug).toBe(SLUG);
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
