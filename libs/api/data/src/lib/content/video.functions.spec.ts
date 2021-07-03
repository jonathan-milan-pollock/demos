import { MediaState, Video } from '@dark-rush-photography/shared/types';
import { findPublicVideos, toVideo } from './video.functions';

describe('video.functions', () => {
  const video = {
    id: 'id',
    entityId: 'entityId',
    fileName: 'fileName',
    state: MediaState.New,
    order: 10,
    isStared: true,
    title: 'title',
    description: 'description',
    keywords: 'keywords',
    dateCreated: 'dateCreated',
    datePublished: 'datePublished',
    imageId: 'imageId',
    hasTrack: false,
    isFlyOver: false,
  } as Video;

  describe('toVideo', () => {
    it('should return all fields of a video', () => {
      const result = toVideo({ ...video });
      expect(result).toEqual(video);
    });

    it('should no longer have an _id', () => {
      const videoWithId = {
        _id: 'id',
        ...video,
      };
      const result = toVideo(videoWithId);
      expect('_id' in result).toBe(false);
    });

    it('should have an undefined title if not provided', () => {
      const result = toVideo({
        ...video,
        title: undefined,
      });
      expect(result.title).toBeUndefined();
    });

    it('should have an undefined description if not provided', () => {
      const result = toVideo({
        ...video,
        description: undefined,
      });
      expect(result.description).toBeUndefined();
    });

    it('should have undefined keywords if not provided', () => {
      const result = toVideo({
        ...video,
        keywords: undefined,
      });
      expect(result.keywords).toBeUndefined();
    });

    it('should have an undefined date published if not provided', () => {
      const result = toVideo({
        ...video,
        datePublished: undefined,
      });
      expect(result.datePublished).toBeUndefined();
    });
  });

  describe('findPublicVideos', () => {
    it('should include videos that are public', () => {
      const videos = [
        { ...video, state: MediaState.New },
        { ...video, state: MediaState.Public },
      ];

      const result = findPublicVideos(videos);
      expect(result.length).toBe(1);
    });

    it('should not include any videos if none are public', () => {
      const videos = [
        { ...video, state: MediaState.New },
        { ...video, state: MediaState.New },
      ];

      const result = findPublicVideos(videos);
      expect(result.length).toBe(0);
    });
  });
});
