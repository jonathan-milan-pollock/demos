import * as faker from 'faker';

import { DUMMY_MONGODB_ID } from '../constants/constants';
import { MediaState } from '../enums/media-state.enum';
import { Video } from '../interfaces/video.interface';

export const mockVideo = (): Video => ({
  id: faker.datatype.uuid(),
  entityId: DUMMY_MONGODB_ID,
  fileName: faker.lorem.word().toLowerCase(),
  state: faker.random.arrayElement(Object.values(MediaState)),
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
  hlsUrl: faker.internet.url(),
  isFlyOver: faker.datatype.boolean(),
  isGenerated: faker.datatype.boolean(),
  isProcessing: faker.datatype.boolean(),
});
