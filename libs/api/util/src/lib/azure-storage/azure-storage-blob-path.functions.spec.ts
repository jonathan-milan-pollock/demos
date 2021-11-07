import * as faker from 'faker';

import {
  ImageDimensionType,
  IMAGE_FILE_EXTENSION,
  IMAGE_VIDEO_FILE_EXTENSION,
} from '@dark-rush-photography/shared/types';
import {
  getAzureStorageBlobPath,
  getAzureStorageBlobPathWithImageDimension,
} from './azure-storage-blob-path.functions';

describe('azure-storage-blob-path.functions', () => {
  describe('getAzureStorageBlobPath', () => {
    it('should correctly format an azure storage blob path for an image', () => {
      const storageId = faker.datatype.uuid();
      const slug = faker.lorem.word();
      const fileExtension = IMAGE_FILE_EXTENSION;

      const result = getAzureStorageBlobPath(storageId, slug, fileExtension);
      expect(result).toBe(`${storageId}/${slug}${fileExtension}`);
    });

    it('should correctly format an azure storage blob path for an image video', () => {
      const storageId = faker.datatype.uuid();
      const slug = faker.lorem.word();
      const fileExtension = IMAGE_VIDEO_FILE_EXTENSION;

      const result = getAzureStorageBlobPath(storageId, slug, fileExtension);
      expect(result).toBe(`${storageId}/${slug}${fileExtension}`);
    });
  });

  describe('getAzureStorageBlobPathWithImageDimension', () => {
    it('should correctly format an azure storage blob path with an image dimension for an image', () => {
      const storageId = faker.datatype.uuid();
      const slug = faker.lorem.word();
      const fileExtension = IMAGE_FILE_EXTENSION;
      const imageDimensionType = faker.random.arrayElement(
        Object.values(ImageDimensionType)
      );

      const result = getAzureStorageBlobPathWithImageDimension(
        storageId,
        slug,
        fileExtension,
        imageDimensionType
      );
      expect(result).toBe(
        `${storageId}/${imageDimensionType.toLowerCase()}/${slug}${fileExtension}`
      );
    });

    it('should correctly format an azure storage blob path with an image dimension for an image video', () => {
      const storageId = faker.datatype.uuid();
      const slug = faker.lorem.word();
      const fileExtension = IMAGE_VIDEO_FILE_EXTENSION;
      const imageDimensionType = faker.random.arrayElement(
        Object.values(ImageDimensionType)
      );

      const result = getAzureStorageBlobPathWithImageDimension(
        storageId,
        slug,
        fileExtension,
        imageDimensionType
      );
      expect(result).toBe(
        `${storageId}/${imageDimensionType.toLowerCase()}/${slug}${fileExtension}`
      );
    });
  });
});
