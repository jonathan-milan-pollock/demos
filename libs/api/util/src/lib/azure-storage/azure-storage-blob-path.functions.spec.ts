import * as faker from 'faker';

import { ImageDimensionType } from '@dark-rush-photography/shared/types';
import {
  getAzureStorageBlobPath,
  getAzureStorageBlobPathWithImageDimension,
} from './azure-storage-blob-path.functions';

describe('azure-storage-blob-path.functions', () => {
  describe('getAzureStorageBlobPath', () => {
    it('should correctly format an azure storage blob path', () => {
      const storageId = faker.datatype.uuid();
      const fileName = faker.system.fileName();

      const result = getAzureStorageBlobPath(storageId, fileName);
      expect(result).toBe(`${storageId}/${fileName}`);
    });
  });

  describe('getAzureStorageBlobPathWithImageDimension', () => {
    it('should correctly format an azure storage blob path with an image dimension', () => {
      const storageId = faker.datatype.uuid();
      const fileName = faker.system.fileName();
      const imageDimensionType = faker.random.arrayElement(
        Object.values(ImageDimensionType)
      );

      const result = getAzureStorageBlobPathWithImageDimension(
        storageId,
        fileName,
        imageDimensionType
      );
      expect(result).toBe(
        `${storageId}/${imageDimensionType.toLowerCase()}/${fileName}`
      );
    });
  });
});
