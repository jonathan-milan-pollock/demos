import * as faker from 'faker';

import { DUMMY_MONGODB_ID } from '../constants/constants';
import { EmotionType } from '../enums/emotion-type.enum';
import { Emotion } from '../interfaces/emotion.interface';
import { mockUser } from './user.mock';

export const mockEmotion = (): Emotion => ({
  id: faker.datatype.uuid(),
  entityId: DUMMY_MONGODB_ID,
  mediaId: faker.datatype.uuid(),
  commentId: faker.datatype.uuid(),
  type: faker.random.arrayElement(Object.values(EmotionType)),
  user: {
    ...mockUser(),
  },
});
