/* eslint-disable @typescript-eslint/no-non-null-assertion */
import faker from '@faker-js/faker';

import {
  DUMMY_MONGODB_ID,
  ImageVideo,
} from '@dark-rush-photography/shared/types';
import { loadImageVideo } from './image-video-load.functions';

describe('image-video-load.functions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('loadImageVideo', () => {
    it('should not contain an _id value', () => {
      const imageVideo = {
        storageId: faker.datatype.uuid(),
        slug: faker.lorem.word(),
      };

      const result = loadImageVideo({
        _id: DUMMY_MONGODB_ID,
        ...imageVideo,
      } as unknown as ImageVideo);

      expect('_id' in result!).toBe(false);
    });

    it('should return undefined if image video is undefined', () => {
      const result = loadImageVideo(undefined);
      expect(result).toBeUndefined();
    });

    it('should load an image video with all values', () => {
      const imageVideo = {
        storageId: faker.datatype.uuid(),
        slug: faker.lorem.word(),
      };

      const result = loadImageVideo(imageVideo);

      expect(result?.storageId).toBe(imageVideo.storageId);
      expect(result?.slug).toBe(imageVideo.slug);
    });
  });
});
