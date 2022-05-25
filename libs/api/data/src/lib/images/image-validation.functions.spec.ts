import { ConflictException, NotFoundException } from '@nestjs/common';

import faker from '@faker-js/faker';

import {
  Image,
  ImageState,
  ImageVideo,
} from '@dark-rush-photography/shared/types';
import {
  validateCanArchiveImage,
  validateCanUnarchiveImage,
  validateImageFound,
  validateImageVideo,
  validatePublishImage,
} from './image-validation.functions';

describe('image-validation.functions', () => {
  describe('validateImageFound', () => {
    it('should return a found image', () => {
      const imageId = faker.datatype.uuid();
      const result = validateImageFound(imageId, [
        { id: imageId } as Image,
      ] as Image[]);
      expect(result.id).toBe(imageId);
    });

    it('should throw a not found exception when image is not found', () => {
      const result = () => {
        validateImageFound(faker.datatype.uuid(), [
          { id: faker.datatype.uuid() } as Image,
        ] as Image[]);
      };
      expect(result).toThrow(NotFoundException);
    });
  });

  describe('validateCanArchiveImage', () => {
    it('should return image when image state is Public', () => {
      const imageId = faker.datatype.uuid();
      const result = validateCanArchiveImage({
        id: imageId,
        state: ImageState.Public,
      } as Image);
      expect(result.id).toBe(imageId);
    });

    it('should throw a conflict exception when image is not Public', () => {
      const result = () => {
        validateCanArchiveImage({
          id: faker.datatype.uuid(),
          state: faker.random.arrayElement(
            Object.values(ImageState).filter(
              (imageState) => imageState !== ImageState.Public
            )
          ),
        } as Image);
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow('Can only archive public images');
    });
  });

  describe('validateCanUnarchiveImage', () => {
    it('should return image when image state is Archived', () => {
      const imageId = faker.datatype.uuid();
      const result = validateCanUnarchiveImage({
        id: imageId,
        state: ImageState.Archived,
      } as Image);
      expect(result.id).toBe(imageId);
    });

    it('should throw a conflict exception when image is not Archived', () => {
      const result = () => {
        validateCanUnarchiveImage({
          id: faker.datatype.uuid(),
          state: faker.random.arrayElement(
            Object.values(ImageState).filter(
              (imageState) => imageState !== ImageState.Archived
            )
          ),
        } as Image);
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow('Can only unarchive archived images');
    });
  });

  describe('validatePublishImage', () => {
    it('should return image when image is Selected or Public', () => {
      const imageId = faker.datatype.uuid();
      const result = validatePublishImage({
        id: imageId,
        state: faker.random.arrayElement(
          Object.values(ImageState).filter(
            (imageState) =>
              imageState === ImageState.Selected ||
              imageState === ImageState.Public
          )
        ),
      } as Image);
      expect(result.id).toBe(imageId);
    });

    it('should throw a conflict exception when image is not Selected or Public', () => {
      const result = () => {
        validatePublishImage({
          id: faker.datatype.uuid(),
          state: faker.random.arrayElement(
            Object.values(ImageState).filter(
              (imageState) =>
                imageState !== ImageState.Selected &&
                imageState !== ImageState.Public
            )
          ),
        } as Image);
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow('Image must be selected or public');
    });
  });

  describe('validateImageVideo', () => {
    it('should return image video when provided', () => {
      const imageVideo: ImageVideo = {
        storageId: faker.datatype.uuid(),
        pathname: faker.lorem.word(),
      };

      const result = validateImageVideo(imageVideo);
      expect(result).toEqual(imageVideo);
    });

    it('should throw a conflict exception when image video is undefined', () => {
      const result = () => {
        validateImageVideo(undefined);
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow('Image video is required');
    });
  });
});
