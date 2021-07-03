import {
  ImageDimension,
  ImageDimensionType,
} from '@dark-rush-photography/shared/types';
import {
  findPublicImageDimensions,
  toImageDimension,
} from './image-dimension.functions';

describe('image-dimension.functions', () => {
  const imageDimension = {
    id: 'id',
    entityId: 'entityId',
    imageId: 'imageId',
    type: ImageDimensionType.Tile,
    pixels: {
      width: 10,
      height: 20,
    },
    threeSixtyImageSettings: {
      pitch: 30,
      yaw: 40,
      hfov: 50,
    },
  } as ImageDimension;

  describe('toImageDimension', () => {
    it('should return all fields of an image dimension', () => {
      const result = toImageDimension({ ...imageDimension });
      expect(result).toEqual(imageDimension);
    });

    it('should no longer have an _id', () => {
      const imageDimensionWithId = {
        _id: 'id',
        ...imageDimension,
      };
      const result = toImageDimension(imageDimensionWithId);
      expect('_id' in result).toBe(false);
    });

    it('should have an undefined three sixty image settings if not provided', () => {
      const result = toImageDimension({
        ...imageDimension,
        threeSixtyImageSettings: undefined,
      });
      expect(result.threeSixtyImageSettings).toBeUndefined();
    });
  });

  describe('findPublicImageDimensions', () => {
    it('should include image dimensions if their images are public', () => {
      const imageDimensions = [
        { ...imageDimension, imageId: '0001' },
        { ...imageDimension, imageId: '0002' },
      ];

      const publicImageIds = ['0001', '0002'];
      const result = findPublicImageDimensions(imageDimensions, publicImageIds);
      expect(result).toEqual(imageDimensions);
    });

    it('should exclude image dimensions if their images are not public', () => {
      const imageDimensions = [
        { ...imageDimension, imageId: '0001' },
        { ...imageDimension, imageId: '0002' },
      ];

      const publicImageIds = ['0001'];
      const result = findPublicImageDimensions(imageDimensions, publicImageIds);
      expect(result.length).toBe(1);
    });

    it('should exclude all image dimensions if there are no public images', () => {
      const imageDimensions = [
        { ...imageDimension, mediaId: '0001' },
        { ...imageDimension, mediaId: '0002' },
      ];

      const publicImageIds: string[] = [];

      const result = findPublicImageDimensions(imageDimensions, publicImageIds);
      expect(result.length).toBe(0);
    });
  });
});
