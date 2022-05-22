import { ConflictException } from '@nestjs/common';

import faker from '@faker-js/faker';

import { Image, ImageState } from '@dark-rush-photography/shared/types';
import {
  validateOnePublishImage,
  validatePublicStarredImage,
  validatePublishImagesAreNotStarredAndLoved,
  validatePublishImagesHaveSeoDescriptions,
  validatePublishImagesHaveSeoKeywords,
  validatePublishImagesHaveSlugs,
  validatePublishImagesHaveStorageIds,
  validatePublishImagesHaveTitles,
  validatePublishLovedImages,
  validatePublishStarredImage,
} from './image-field-validation.functions';

describe('image-validation.functions', () => {
  describe('validateOnePublishImage', () => {
    it('should return one publish image when there is one selected image', () => {
      const imageId = faker.datatype.uuid();
      const result = validateOnePublishImage([
        { id: imageId, state: ImageState.Selected } as Image,
      ]);
      expect(result?.id).toBe(imageId);
    });

    it('should return one publish image when there is one public image', () => {
      const imageId = faker.datatype.uuid();
      const result = validateOnePublishImage([
        { id: imageId, state: ImageState.Public } as Image,
      ]);
      expect(result?.id).toBe(imageId);
    });

    it('should throw a conflict exception when there are not any images', () => {
      const result = () => {
        validateOnePublishImage([] as Image[]);
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow('One publish image is required');
    });

    it('should throw a conflict exception when there is only a new image', () => {
      const result = () => {
        validateOnePublishImage([
          { state: ImageState.New } as Image,
        ] as Image[]);
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow('One publish image is required');
    });

    it('should throw a conflict exception when there is only an archived images', () => {
      const result = () => {
        validateOnePublishImage([
          { state: ImageState.Archived } as Image,
        ] as Image[]);
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow('One publish image is required');
    });

    it('should throw a conflict exception when there is more than one publish image', () => {
      const result = () => {
        validateOnePublishImage([
          { state: ImageState.Selected } as Image,
          { state: ImageState.Public } as Image,
        ] as Image[]);
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow('More than one publish image was found');
    });
  });

  describe('validatePublishImagesHaveStorageIds', () => {
    it('should return images when all publish images have storage ids', () => {
      const images = [
        {
          storageId: faker.datatype.uuid(),
          state: ImageState.Selected,
        } as Image,
        {
          storageId: faker.datatype.uuid(),
          state: ImageState.Public,
        } as Image,
      ];
      const result = validatePublishImagesHaveStorageIds(images);
      expect(result).toEqual(images);
    });

    it('should return images when new or archived images do not have storage ids', () => {
      const images = [
        {
          state: ImageState.New,
        } as Image,
        {
          state: ImageState.Archived,
        } as Image,
      ];
      const result = validatePublishImagesHaveStorageIds(images);
      expect(result).toEqual(images);
    });

    it('should throw a conflict exception when a publish image does not have a storage id', () => {
      const images = [
        { state: ImageState.Selected } as Image,
        {
          storageId: faker.datatype.uuid(),
          state: ImageState.Public,
        } as Image,
      ];
      const result = () => {
        validatePublishImagesHaveStorageIds(images);
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow('Image storage ids are required');
    });
  });

  describe('validatePublishImagesHaveSlugs', () => {
    it('should return images when all publish images have slugs', () => {
      const images = [
        {
          slug: faker.lorem.word(),
          state: ImageState.Selected,
        } as Image,
        {
          slug: faker.lorem.word(),
          state: ImageState.Public,
        } as Image,
      ];
      const result = validatePublishImagesHaveSlugs(images);
      expect(result).toEqual(images);
    });

    it('should return images when new or archived images do not have slugs', () => {
      const images = [
        {
          state: ImageState.New,
        } as Image,
        {
          state: ImageState.Archived,
        } as Image,
      ];
      const result = validatePublishImagesHaveSlugs(images);
      expect(result).toEqual(images);
    });

    it('should throw a conflict exception when a publish image does not have a slug', () => {
      const images = [
        { state: ImageState.Selected } as Image,
        {
          slug: faker.lorem.word(),
          state: ImageState.Public,
        } as Image,
      ];
      const result = () => {
        validatePublishImagesHaveSlugs(images);
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow('Image slugs are required');
    });
  });

  describe('validatePublishImagesAreNotStarredAndLoved', () => {
    it('should return images when any publish images are starred and loved', () => {
      const images = [
        {
          state: ImageState.Selected,
          isStarred: true,
          isLoved: false,
        } as Image,
        {
          state: ImageState.Public,
          isStarred: false,
          isLoved: true,
        } as Image,
      ];
      const result = validatePublishImagesAreNotStarredAndLoved(images);
      expect(result).toEqual(images);
    });

    it('should return images when new or archived publish images are both starred and loved', () => {
      const images = [
        {
          state: ImageState.New,
          isStarred: true,
          isLoved: true,
        } as Image,
        {
          state: ImageState.Archived,
          isStarred: false,
          isLoved: true,
        } as Image,
      ];
      const result = validatePublishImagesAreNotStarredAndLoved(images);
      expect(result).toEqual(images);
    });

    it('should throw a conflict exception when a publish image is both starred and loved', () => {
      const images = [
        {
          state: ImageState.Selected,
          isStarred: true,
          isLoved: true,
        } as Image,
        {
          state: ImageState.Public,
          isStarred: false,
          isLoved: true,
        } as Image,
      ];
      const result = () => {
        validatePublishImagesAreNotStarredAndLoved(images);
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow('Images cannot be both starred and loved');
    });
  });

  describe('validatePublishStarredImage', () => {
    it('should return starred image when starred image is selected', () => {
      const imageId = faker.datatype.uuid();
      const result = validatePublishStarredImage([
        { id: imageId, state: ImageState.Selected, isStarred: true } as Image,
      ]);
      expect(result?.id).toBe(imageId);
    });

    it('should return starred image from entity when starred image is public', () => {
      const imageId = faker.datatype.uuid();
      const result = validatePublishStarredImage([
        { id: imageId, state: ImageState.Public, isStarred: true } as Image,
      ]);
      expect(result?.id).toBe(imageId);
    });

    it('should throw a conflict exception when there are not any images', () => {
      const result = () => {
        validatePublishStarredImage([] as Image[]);
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow('One starred publish image is required');
    });

    it('should throw a conflict exception when starred image is new', () => {
      const result = () => {
        validatePublishStarredImage([
          { state: ImageState.New, isStarred: true } as Image,
        ] as Image[]);
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow('One starred publish image is required');
    });

    it('should throw a conflict exception when starred image is archived', () => {
      const result = () => {
        validatePublishStarredImage([
          { state: ImageState.Archived, isStarred: true } as Image,
        ] as Image[]);
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow('One starred publish image is required');
    });

    it('should throw a conflict exception when there is more than one starred publish image', () => {
      const result = () => {
        validatePublishStarredImage([
          { state: ImageState.Selected, isStarred: true } as Image,
          { state: ImageState.Public, isStarred: true } as Image,
        ] as Image[]);
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow('More than one publish image was starred');
    });
  });

  describe('validatePublicStarredImage', () => {
    it('should return starred image from entity when starred image is public', () => {
      const imageId = faker.datatype.uuid();
      const result = validatePublicStarredImage([
        { id: imageId, state: ImageState.Public, isStarred: true } as Image,
      ]);
      expect(result?.id).toBe(imageId);
    });

    it('should throw a conflict exception when there are not any images', () => {
      const result = () => {
        validatePublicStarredImage([] as Image[]);
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow('One starred public image is required');
    });

    it('should throw a conflict exception when starred image is not public', () => {
      const result = () => {
        validatePublicStarredImage([
          {
            state: faker.random.arrayElement(
              Object.values(ImageState).filter(
                (imageState) => imageState !== ImageState.Public
              )
            ),
            isStarred: true,
          } as Image,
        ]);
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow('One starred public image is required');
    });

    it('should throw a conflict exception when there is more than one starred public image', () => {
      const result = () => {
        validatePublicStarredImage([
          { state: ImageState.Public, isStarred: true } as Image,
          { state: ImageState.Public, isStarred: true } as Image,
        ] as Image[]);
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow('More than one public image was starred');
    });
  });

  describe('validatePublishLovedImages', () => {
    it('should return loved publish images from entity', () => {
      const result = validatePublishLovedImages([
        { state: ImageState.Selected, isLoved: true } as Image,
        { state: ImageState.Selected, isLoved: true } as Image,
        { state: ImageState.Selected, isLoved: true } as Image,
        { state: ImageState.Selected, isLoved: true } as Image,
        { state: ImageState.Selected, isLoved: true } as Image,
        { state: ImageState.Public, isLoved: true } as Image,
        { state: ImageState.Public, isLoved: true } as Image,
        { state: ImageState.Public, isLoved: true } as Image,
        { state: ImageState.Public, isLoved: true } as Image,
        { state: ImageState.Public, isLoved: true } as Image,
      ]);
      expect(result.length).toBe(10);
    });

    it('should throw a conflict exception when there are not any images', () => {
      const result = () => {
        validatePublishLovedImages([] as Image[]);
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow('At least one loved image is required');
    });

    it('should throw a conflict exception when loved image is new', () => {
      const result = () => {
        validatePublishLovedImages([
          { state: ImageState.New, isLoved: true } as Image,
        ] as Image[]);
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow('At least one loved image is required');
    });

    it('should throw a conflict exception when loved image is archived', () => {
      const result = () => {
        validatePublishLovedImages([
          { state: ImageState.Archived, isLoved: true } as Image,
        ] as Image[]);
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow('At least one loved image is required');
    });

    it('should throw a conflict exception when there are more than ten loved publish images', () => {
      const result = () => {
        validatePublishLovedImages([
          { state: ImageState.Selected, isLoved: true } as Image,
          { state: ImageState.Selected, isLoved: true } as Image,
          { state: ImageState.Selected, isLoved: true } as Image,
          { state: ImageState.Selected, isLoved: true } as Image,
          { state: ImageState.Selected, isLoved: true } as Image,
          { state: ImageState.Public, isLoved: true } as Image,
          { state: ImageState.Public, isLoved: true } as Image,
          { state: ImageState.Public, isLoved: true } as Image,
          { state: ImageState.Public, isLoved: true } as Image,
          { state: ImageState.Public, isLoved: true } as Image,
          { state: ImageState.Public, isLoved: true } as Image,
        ] as Image[]);
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow('More than 10 images are loved');
    });
  });

  describe('validatePublishImagesHaveTitles', () => {
    it('should return images when publish images have titles', () => {
      const images = [
        {
          title: faker.lorem.sentence(),
          state: ImageState.Selected,
        } as Image,
        {
          title: faker.lorem.sentence(),
          state: ImageState.Public,
        } as Image,
      ];
      const result = validatePublishImagesHaveTitles(images);
      expect(result).toEqual(images);
    });

    it('should return images when new or archived images do not have titles', () => {
      const images = [
        {
          state: ImageState.New,
        } as Image,
        {
          state: ImageState.Archived,
        } as Image,
      ];
      const result = validatePublishImagesHaveTitles(images);
      expect(result).toEqual(images);
    });

    it('should throw a conflict exception when a publish image does not have a title', () => {
      const images = [
        { state: ImageState.Selected } as Image,
        {
          title: faker.lorem.sentence(),
          state: ImageState.Public,
        } as Image,
      ];
      const result = () => {
        validatePublishImagesHaveTitles(images);
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow('Image titles are required');
    });
  });

  describe('validatePublishImagesHaveSeoDescriptions', () => {
    it('should return images when publish images have SEO descriptions', () => {
      const images = [
        {
          state: ImageState.Selected,
          seoDescription: faker.lorem.sentences(),
        } as Image,
        {
          state: ImageState.Public,
          seoDescription: faker.lorem.sentences(),
        } as Image,
      ];
      const result = validatePublishImagesHaveSeoDescriptions(images);
      expect(result).toEqual(images);
    });

    it('should return images when new or archived images do not have SEO descriptions', () => {
      const images = [
        {
          state: ImageState.New,
        } as Image,
        {
          state: ImageState.Archived,
        } as Image,
      ];
      const result = validatePublishImagesHaveSeoDescriptions(images);
      expect(result).toEqual(images);
    });

    it('should throw a conflict exception when a publish image does not have an SEO description', () => {
      const images = [
        { state: ImageState.Selected } as Image,
        {
          state: ImageState.Public,
          seoDescription: faker.lorem.sentences(),
        } as Image,
      ];
      const result = () => {
        validatePublishImagesHaveSeoDescriptions(images);
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow('Image SEO descriptions are required');
    });
  });

  describe('validatePublishImagesHaveSeoKeywords', () => {
    it('should return images when publish images have SEO keywords', () => {
      const images = [
        {
          state: ImageState.Selected,
          seoKeywords: [
            faker.lorem.word(),
            faker.lorem.word(),
            faker.lorem.word(),
          ].join(','),
        } as Image,
        {
          state: ImageState.Public,
          seoKeywords: [
            faker.lorem.word(),
            faker.lorem.word(),
            faker.lorem.word(),
          ].join(','),
        } as Image,
      ];
      const result = validatePublishImagesHaveSeoKeywords(images);
      expect(result).toEqual(images);
    });

    it('should return images when new or archived images do not have SEO keywords', () => {
      const images = [
        {
          state: ImageState.New,
        } as Image,
        {
          state: ImageState.Archived,
        } as Image,
      ];
      const result = validatePublishImagesHaveSeoKeywords(images);
      expect(result).toEqual(images);
    });

    it('should throw a conflict exception when a publish image does not have an SEO keyword', () => {
      const images = [
        { state: ImageState.Selected } as Image,
        {
          state: ImageState.Public,
          seoKeywords: [
            faker.lorem.word(),
            faker.lorem.word(),
            faker.lorem.word(),
          ].join(','),
        } as Image,
      ];
      const result = () => {
        validatePublishImagesHaveSeoKeywords(images);
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow('Image SEO keywords are required');
    });
  });
});
