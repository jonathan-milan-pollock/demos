import { Image, MediaState } from '@dark-rush-photography/shared/types';
import { findPublicImages, toImage } from './image.functions';

describe('image.functions', () => {
  const image = {
    id: 'id',
    entityId: 'entityId',
    fileName: 'fileName',
    state: MediaState.New,
    order: 10,
    isStared: true,
    isLoved: true,
    title: 'title',
    description: 'description',
    keywords: 'keywords',
    dateCreated: 'dateCreated',
    datePublished: 'datePublished',
  } as Image;

  describe('toImage', () => {
    it('should return all fields of an image', () => {
      const result = toImage({ ...image });
      expect(result).toEqual(image);
    });

    it('should no longer have an _id', () => {
      const imageWithId = {
        _id: 'id',
        ...image,
      };
      const result = toImage(imageWithId);
      expect('_id' in result).toBe(false);
    });

    /*
    TODO: Test other undefined properties like this
    it('should have an undefined title if not provided', () => {
      const result = toImage({
        ...image,
        title: undefined,
      });
      expect(result.title).toBeUndefined();
    });*/
  });

  describe('findPublicImages', () => {
    it('should include images that are public', () => {
      const images = [
        { ...image, state: MediaState.New },
        { ...image, state: MediaState.Public },
      ];

      const result = findPublicImages(images);
      expect(result.length).toBe(1);
    });

    it('should not include any images if none are public', () => {
      const images = [
        { ...image, state: MediaState.New },
        { ...image, state: MediaState.New },
      ];

      const result = findPublicImages(images);
      expect(result.length).toBe(0);
    });
  });
});
