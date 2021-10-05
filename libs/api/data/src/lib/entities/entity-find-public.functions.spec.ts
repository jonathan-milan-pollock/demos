import { Image, ImageState } from '@dark-rush-photography/shared/types';

describe('content-load-public.functions', () => {
  describe('findPublicImages', () => {
    it('should include images that are public', () => {
      const images: Image[] = [
        { state: ImageState.New } as Image,
        { state: ImageState.Selected } as Image,
        { state: ImageState.Public } as Image,
        { state: ImageState.Archived } as Image,
      ];

      //const result = findPublicImages(images);
      //expect(result.length).toBe(1);
    });

    it('should not include any images if none are public', () => {
      const images: Image[] = [
        { state: ImageState.New } as Image,
        { state: ImageState.Selected } as Image,
        { state: ImageState.Archived } as Image,
      ];

      //const result = findPublicImages(images);
      //expect(result.length).toBe(0);
    });
  });
});
