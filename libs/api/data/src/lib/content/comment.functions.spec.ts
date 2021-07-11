import * as faker from 'faker';

import {
  Comment,
  DUMMY_MONGODB_ID,
  User,
} from '@dark-rush-photography/shared/types';
import { findPublicComments, toComment } from './comment.functions';

describe('comment.functions', () => {
  const mockUser: User = {
    email: faker.internet.email(),
    name: faker.name.findName(faker.name.firstName(), faker.name.lastName()),
    image: faker.image.dataUri(),
  };

  const comment: Comment = {
    id: faker.datatype.uuid(),
    entityId: DUMMY_MONGODB_ID,
    mediaId: faker.datatype.uuid(),
    order: faker.datatype.number(),
    user: {
      ...mockUser,
    },
    text: faker.lorem.sentence(),
  };

  describe('toComment', () => {
    it('should return all fields of a comment', () => {
      const result = toComment({ ...comment });
      expect(result).toEqual(comment);
    });

    it('should no longer have an _id', () => {
      const commentWithId = {
        _id: 'id',
        ...comment,
      };
      const result = toComment(commentWithId);
      expect('_id' in result).toBe(false);
    });

    it('should have an undefined media id if not provided', () => {
      const result = toComment({ ...comment, mediaId: undefined });
      expect(result.mediaId).toBeUndefined();
    });
  });

  describe('findPublicComments', () => {
    it('should return comments that are on the entity', () => {
      const entityComments = [
        { ...comment, mediaId: undefined },
        { ...comment, mediaId: undefined },
      ];

      const result = findPublicComments(entityComments, []);
      expect(result).toEqual(entityComments);
    });

    it('should exclude comments if they have media ids that are not public', () => {
      const comments = [
        { ...comment, mediaId: '0001' },
        { ...comment, mediaId: '0002' },
      ];

      const publicMediaIds = ['0001'];

      const result = findPublicComments(comments, publicMediaIds);
      expect(result.length).toBe(1);
    });

    it('should include comments if on the entity or have public media ids', () => {
      const comments = [
        { ...comment, mediaId: undefined },
        { ...comment, mediaId: undefined },
        { ...comment, mediaId: '0001' },
        { ...comment, mediaId: '0002' },
      ];

      const publicMediaIds = ['0001', '0002'];

      const result = findPublicComments(comments, publicMediaIds);
      expect(result).toEqual(comments);
    });
  });
});
