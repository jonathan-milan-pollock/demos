import * as faker from 'faker';

import { Comment, User } from '@dark-rush-photography/shared/types';
import { DUMMY_MONGODB_ID } from '@dark-rush-photography/shared/types';
import { findPublicComments, loadComment } from './comment.functions';

describe('comment.functions', () => {
  const user: User = {
    email: faker.internet.email(),
    name: faker.name.findName(faker.name.firstName(), faker.name.lastName()),
    imageUrl: faker.image.dataUri(),
  };

  const comment: Comment = {
    id: faker.datatype.uuid(),
    entityId: DUMMY_MONGODB_ID,
    imageId: faker.datatype.uuid(),
    order: faker.datatype.number(),
    user: {
      ...user,
    },
    text: faker.lorem.sentence(),
  };

  describe('toComment', () => {
    it('should return all fields of a comment', () => {
      const result = loadComment({ ...comment });
      expect(result).toEqual(comment);
    });

    it('should no longer have an _id', () => {
      const commentWithId = {
        ...comment,
        _id: 'id',
      };
      const result = loadComment(commentWithId);
      expect('_id' in result).toBe(false);
    });

    it('should have an undefined media id if not provided', () => {
      const result = loadComment({ ...comment, imageId: undefined });
      expect(result.imageId).toBeUndefined();
    });
  });

  describe('findPublicComments', () => {
    it('should return comments that are on the entity', () => {
      const entityComments = [
        { ...comment, imageId: undefined },
        { ...comment, imageId: undefined },
      ];

      const result = findPublicComments(entityComments, []);
      expect(result).toEqual(entityComments);
    });

    it('should exclude comments if they have media ids that are not public', () => {
      const comments = [
        { ...comment, imageId: '0001' },
        { ...comment, imageId: '0002' },
      ];

      const publicImageIds = ['0001'];

      const result = findPublicComments(comments, publicImageIds);
      expect(result.length).toBe(1);
    });

    it('should include comments if on the entity or have public media ids', () => {
      const comments = [
        { ...comment, imageId: undefined },
        { ...comment, imageId: undefined },
        { ...comment, imageId: '0001' },
        { ...comment, imageId: '0002' },
      ];

      const publicImageIds = ['0001', '0002'];

      const result = findPublicComments(comments, publicImageIds);
      expect(result).toEqual(comments);
    });
  });
});
