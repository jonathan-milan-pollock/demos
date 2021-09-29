import * as faker from 'faker';

import {
  Emotion,
  EmotionType,
  User,
} from '@dark-rush-photography/shared/types';
import { findPublicEmotions, loadEmotion } from './emotion.functions';
import { DUMMY_MONGODB_ID } from '@dark-rush-photography/shared/types';

describe('emotion.functions', () => {
  const user: User = {
    email: faker.internet.email(),
    name: faker.name.findName(faker.name.firstName(), faker.name.lastName()),
    imageUrl: faker.image.imageUrl(),
  };

  const emotion: Emotion = {
    id: faker.datatype.uuid(),
    entityId: DUMMY_MONGODB_ID,
    imageId: faker.datatype.uuid(),
    commentId: faker.datatype.uuid(),
    type: faker.random.arrayElement(Object.values(EmotionType)),
    user: {
      ...user,
    },
  };

  describe('toEmotion', () => {
    it('should return all fields of an emotion', () => {
      const result = loadEmotion({ ...emotion });
      expect(result).toEqual(emotion);
    });

    it('should no longer have an _id', () => {
      const emotionWithId = {
        ...emotion,
        _id: 'id',
      };
      const result = loadEmotion(emotionWithId);
      expect('_id' in result).toBe(false);
    });

    it('should have an undefined media id if not provided', () => {
      const result = loadEmotion({ ...emotion, imageId: undefined });
      expect(result.imageId).toBeUndefined();
    });

    it('should have an undefined comment id if not provided', () => {
      const result = loadEmotion({ ...emotion, commentId: undefined });
      expect(result.commentId).toBeUndefined();
    });
  });

  describe('findPublicEmotions', () => {
    it('should return emotions that are on the entity', () => {
      const entityEmotions = [
        { ...emotion, imageId: undefined, commentId: undefined },
        { ...emotion, imageId: undefined, commentId: undefined },
      ];

      const result = findPublicEmotions(entityEmotions, [], []);
      expect(result).toEqual(entityEmotions);
    });

    it('should exclude emotions if they have media ids that are not public', () => {
      const emotions = [
        { ...emotion, imageId: '0001' },
        { ...emotion, imageId: '0002' },
      ];

      const publicImageIds = ['0001'];

      const result = findPublicEmotions(emotions, publicImageIds, []);
      expect(result.length).toBe(1);
    });

    it('should exclude emotions if they have comment ids that are not public', () => {
      const emotions = [
        { ...emotion, commentId: '0001' },
        { ...emotion, commentId: '0002' },
      ];

      const publicCommentIds = ['0001'];

      const result = findPublicEmotions(emotions, [], publicCommentIds);
      expect(result.length).toBe(1);
    });

    it('should include emotions if media or comment id is undefined or have public image or video ids', () => {
      const emotions = [
        { ...emotion, imageId: undefined, commentId: undefined },
        { ...emotion, imageId: undefined, commentId: undefined },
        { ...emotion, imageId: '0001' },
        { ...emotion, imageId: '0002' },
        { ...emotion, commentId: '0003' },
        { ...emotion, commentId: '0004' },
      ];

      const publicImageIds = ['0001', '0002'];
      const publicCommentIds = ['0003', '0004'];

      const result = findPublicEmotions(
        emotions,
        publicImageIds,
        publicCommentIds
      );
      expect(result).toEqual(emotions);
    });
  });
});
