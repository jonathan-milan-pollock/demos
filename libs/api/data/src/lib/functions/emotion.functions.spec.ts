import { Emotion, EmotionType } from '@dark-rush-photography/shared-types';
import { findPublicEmotions, toEmotion } from './emotion.functions';

describe('emotion.functions', () => {
  const emotion = {
    id: 'id',
    entityId: 'entityId',
    commentId: 'commentId',
    mediaId: 'mediaId',
    type: EmotionType.Care,
    user: {
      email: 'email',
      name: 'name',
      image: 'image',
    },
  } as Emotion;

  describe('toEmotion', () => {
    it('should return all fields of an emotion', () => {
      const result = toEmotion({ ...emotion });
      expect(result).toEqual(emotion);
    });

    it('should no longer have an _id', () => {
      const emotionWithId = {
        _id: 'id',
        ...emotion,
      };
      const result = toEmotion(emotionWithId);
      expect('_id' in result).toBe(false);
    });

    it('should have an undefined comment id if not provided', () => {
      const result = toEmotion({ ...emotion, commentId: undefined });
      expect(result.commentId).toBeUndefined();
    });

    it('should have an undefined media id if not provided', () => {
      const result = toEmotion({ ...emotion, mediaId: undefined });
      expect(result.mediaId).toBeUndefined();
    });
  });

  describe('findPublicEmotions', () => {
    it('should return emotions that are on the entity', () => {
      const entityEmotions = [
        { ...emotion, commentId: undefined, mediaId: undefined },
        { ...emotion, commentId: undefined, mediaId: undefined },
      ];

      const result = findPublicEmotions(entityEmotions, [], []);
      expect(result).toEqual(entityEmotions);
    });

    it('should exclude emotions if they have comment ids that are not public', () => {
      const emotions = [
        { ...emotion, commentId: '0001' },
        { ...emotion, commentId: '0002' },
      ];

      const publicCommentIds = ['0001'];

      const result = findPublicEmotions(emotions, publicCommentIds, []);
      expect(result.length).toBe(1);
    });

    it('should exclude emotions if they have media ids that are not public', () => {
      const emotions = [
        { ...emotion, mediaId: '0001' },
        { ...emotion, mediaId: '0002' },
      ];

      const publicMediaIds = ['0001'];

      const result = findPublicEmotions(emotions, [], publicMediaIds);
      expect(result.length).toBe(1);
    });

    it('should include comments if media id is undefined or have public image or video ids', () => {
      const emotions = [
        { ...emotion, commentId: undefined, mediaId: undefined },
        { ...emotion, commentId: undefined, mediaId: undefined },
        { ...emotion, commentId: '0001' },
        { ...emotion, commentId: '0002' },
        { ...emotion, mediaId: '0003' },
        { ...emotion, mediaId: '0004' },
      ];

      const publicCommentIds = ['0001', '0002'];
      const publicMediaIds = ['0003', '0004'];

      const result = findPublicEmotions(
        emotions,
        publicCommentIds,
        publicMediaIds
      );
      expect(result).toEqual(emotions);
    });
  });
});
