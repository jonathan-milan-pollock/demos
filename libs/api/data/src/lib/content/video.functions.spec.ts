import * as faker from 'faker';

import { Video } from '@dark-rush-photography/shared/types';
import { DUMMY_MONGODB_ID } from '@dark-rush-photography/shared/types';
import { loadVideo } from './video.functions';

describe('video.functions', () => {
  const video: Video = {
    id: faker.datatype.uuid(),
    entityId: DUMMY_MONGODB_ID,
    blobPathId: faker.datatype.uuid(),
    fileName: faker.system.fileName(),
  };

  describe('loadVideo', () => {
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
  });
});
