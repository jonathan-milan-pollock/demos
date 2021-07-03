import * as faker from 'faker';

import { DUMMY_MONGODB_ID } from '../constants/constants';
import { Comment } from '../interfaces/comment.interface';
import { mockUser } from './user.mock';

export const mockComment = (): Comment => ({
  id: faker.datatype.uuid(),
  entityId: DUMMY_MONGODB_ID,
  mediaId: faker.datatype.uuid(),
  order: faker.datatype.number(),
  user: {
    ...mockUser(),
  },
  text: faker.lorem.sentence(),
});
