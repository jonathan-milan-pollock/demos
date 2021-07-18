import * as faker from 'faker';
import { MediaState, Video } from '@dark-rush-photography/shared/types';
import { DUMMY_MONGODB_ID } from '@dark-rush-photography/api/types';
import { findPublicVideos, loadVideo } from './video.functions';

describe('video.functions', () => {
  const video: Video = {
    id: faker.datatype.uuid(),
    entityId: DUMMY_MONGODB_ID,
    fileName: faker.lorem.word().toLowerCase(),
    state: faker.random.arrayElement(Object.values(MediaState)),
    order: faker.datatype.number(),
    isStarred: faker.datatype.boolean(),
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    keywords: `${faker.lorem.word().toLowerCase()}, ${faker.lorem
      .word()
      .toLowerCase()}, ${faker.lorem.word().toLowerCase()}`,
    dateCreated: faker.date.recent().toISOString(),
    datePublished: faker.date.recent().toISOString(),
    isThreeSixty: faker.datatype.boolean(),
    threeSixtySettings: undefined,
    coverImageId: faker.datatype.uuid(),
    hlsUrl: faker.internet.url(),
    isFlyOver: faker.datatype.boolean(),
    isUploaded: faker.datatype.boolean(),
    isGenerated: faker.datatype.boolean(),
    isProcessing: faker.datatype.boolean(),
  };

  describe('toVideo', () => {
    it('should return all fields of a video', () => {
      const result = loadVideo({ ...video });
      expect(result).toEqual(video);
    });

    it('should no longer have an _id', () => {
      const videoWithId = {
        _id: 'id',
        ...video,
      };
      const result = loadVideo(videoWithId);
      expect('_id' in result).toBe(false);
    });

    /*
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
    */
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
