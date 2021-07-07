import {
  VideoDimension,
  VideoDimensionType,
} from '@dark-rush-photography/shared/types';
import {
  findPublicVideoDimensions,
  toVideoDimension,
} from './video-dimension.functions';

describe('video-dimension.functions', () => {
  const videoDimension = {
    id: 'id',
    entityId: 'entityId',
    videoId: 'videoId',
    type: VideoDimensionType.YouTube,
    pixels: {
      width: 10,
      height: 20,
    },
  } as VideoDimension;

  describe('toVideoDimension', () => {
    it('should return all fields of a video dimension', () => {
      const result = toVideoDimension({ ...videoDimension });
      expect(result).toEqual(videoDimension);
    });

    it('should no longer have an _id', () => {
      const videoDimensionWithId = {
        _id: 'id',
        ...videoDimension,
      };
      const result = toVideoDimension(videoDimensionWithId);
      expect('_id' in result).toBe(false);
    });
  });

  describe('findPublicVideoDimensions', () => {
    it('should include video dimensions if their videos are public', () => {
      const videoDimensions = [
        { ...videoDimension, videoId: '0001' },
        { ...videoDimension, videoId: '0002' },
      ];

      const publicVideoIds = ['0001', '0002'];
      const result = findPublicVideoDimensions(videoDimensions, publicVideoIds);
      expect(result).toEqual(videoDimensions);
    });

    it('should exclude video dimensions if their videos are not public', () => {
      const videoDimensions = [
        { ...videoDimension, videoId: '0001' },
        { ...videoDimension, videoId: '0002' },
      ];

      const publicVideoIds = ['0001'];
      const result = findPublicVideoDimensions(videoDimensions, publicVideoIds);
      expect(result.length).toBe(1);
    });

    it('should exclude all video dimensions if there are no public videos', () => {
      const videoDimensions = [
        { ...videoDimension, mediaId: '0001' },
        { ...videoDimension, mediaId: '0002' },
      ];

      const publicVideoIds: string[] = [];

      const result = findPublicVideoDimensions(videoDimensions, publicVideoIds);
      expect(result.length).toBe(0);
    });
  });
});
