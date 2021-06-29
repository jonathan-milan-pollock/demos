import * as faker from 'faker';

import { DUMMY_MONGODB_ID } from '../constants/constants';
import { PostState } from '../enums/post-state.enum';
import { Video } from '../interfaces/video.interface';

export const mockVideo = (): Video => ({
  id: faker.datatype.uuid(),
  entityId: DUMMY_MONGODB_ID,
  fileName: faker.lorem.word().toLowerCase(),
  postState: faker.random.arrayElement(Object.values(PostState)),
  order: faker.datatype.number(),
  isStared: faker.datatype.boolean(),
  title: faker.lorem.sentence(),
  description: faker.lorem.paragraph(),
  keywords: `${faker.lorem
    .word()
    .toLowerCase()}, ${faker.lorem
    .word()
    .toLowerCase()}, ${faker.lorem.word().toLowerCase()}`,
  dateCreated: faker.date.recent().toISOString(),
  datePublished: faker.date.recent().toISOString(),
  coverImageId: faker.datatype.uuid(),
  hlsStreamingUrl: faker.internet.url(),
  isFlyOver: faker.datatype.boolean(),
  isProcessed: faker.datatype.boolean(),
  isLocked: faker.datatype.boolean(),
});
