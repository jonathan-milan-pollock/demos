import {
  Image,
  ImageDimension,
  ImageState,
} from '@dark-rush-photography/shared/types';
import {
  findPublicImageDimensions,
  findPublicImages,
} from './content-load-public.functions';

describe('content-load-public.functions', () => {
  describe('findPublicImages', () => {
    it('should include images that are public', () => {
      const images: Image[] = [
        { state: ImageState.New } as Image,
        { state: ImageState.Selected } as Image,
        { state: ImageState.Public } as Image,
        { state: ImageState.Archived } as Image,
      ];

      const result = findPublicImages(images);
      expect(result.length).toBe(1);
    });

    it('should not include any images if none are public', () => {
      const images: Image[] = [
        { state: ImageState.New } as Image,
        { state: ImageState.Selected } as Image,
        { state: ImageState.Archived } as Image,
      ];

      const result = findPublicImages(images);
      expect(result.length).toBe(0);
    });
  });

  describe('findPublicImageDimensions', () => {
    it('should include image dimensions if their images are public', () => {
      const imageDimensions: ImageDimension[] = [
        { imageId: '0001' } as ImageDimension,
        { imageId: '0002' } as ImageDimension,
      ];

      const publicImageIds = ['0001', '0002'];
      const result = findPublicImageDimensions(imageDimensions, publicImageIds);
      expect(result).toEqual(imageDimensions);
    });

    it('should exclude image dimensions if their images are not public', () => {
      const imageDimensions: ImageDimension[] = [
        { imageId: '0001' } as ImageDimension,
        { imageId: '0002' } as ImageDimension,
      ];

      const publicImageIds = ['0001'];
      const result = findPublicImageDimensions(imageDimensions, publicImageIds);
      expect(result.length).toBe(1);
    });

    it('should exclude all image dimensions if there are no public images', () => {
      const imageDimensions: ImageDimension[] = [
        { imageId: '0001' } as ImageDimension,
        { imageId: '0002' } as ImageDimension,
      ];

      const publicImageIds: string[] = [];

      const result = findPublicImageDimensions(imageDimensions, publicImageIds);
      expect(result.length).toBe(0);
    });
  });
});
